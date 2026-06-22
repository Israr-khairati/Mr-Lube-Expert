import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { SEOHead } from "@/components/SEOHead";
import {
  Calendar,
  Car,
  Clock,
  Download,
  FileText,
  Image as ImageIcon,
  LayoutDashboard,
  LogOut,
  Plus,
  Trash2,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Search,
  Filter,
  User,
  Settings
} from "lucide-react";

type BookingStatus = "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<"overview" | "bookings" | "media" | "content">("overview");

  // Authentication check
  const { data: user, isLoading: isUserLoading, error: userError } = trpc.auth.me.useQuery();
  const logoutMutation = trpc.admin.logout.useMutation();

  // Queries & Mutations
  const utils = trpc.useUtils();
  const { data: dashboardData, isLoading: isStatsLoading, refetch: refetchStats } = trpc.admin.dashboardStats.useQuery(undefined, {
    enabled: !!user && user.role === "admin",
  });
  const { data: bookings, isLoading: isBookingsLoading, refetch: refetchBookings } = trpc.admin.bookings.list.useQuery(undefined, {
    enabled: !!user && user.role === "admin",
  });
  const { data: mediaItems, isLoading: isMediaLoading, refetch: refetchMedia } = trpc.admin.media.list.useQuery();
  const { data: siteContentMap, isLoading: isContentLoading, refetch: refetchContent } = trpc.admin.content.get.useQuery();

  const updateBookingStatus = trpc.admin.bookings.updateStatus.useMutation();
  const deleteBooking = trpc.admin.bookings.delete.useMutation();
  const updateContent = trpc.admin.content.update.useMutation();
  const uploadMedia = trpc.admin.media.upload.useMutation();
  const deleteMedia = trpc.admin.media.delete.useMutation();
  const reorderMedia = trpc.admin.media.reorder.useMutation();

  // Booking details & filters
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedBooking, setSelectedBooking] = useState<any>(null);

  // Content form state
  const [contentForm, setContentForm] = useState<Record<string, string>>({});

  // Media upload state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [mediaCategory, setMediaCategory] = useState("gallery");
  const [mediaTitle, setMediaTitle] = useState("");
  const [mediaDesc, setMediaDesc] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (siteContentMap) {
      setContentForm(siteContentMap);
    }
  }, [siteContentMap]);

  // Auth redirection
  useEffect(() => {
    if (!isUserLoading && (!user || user.role !== "admin")) {
      toast.error("Access denied. Please log in first.");
      setLocation("/admin/login");
    }
  }, [user, isUserLoading, setLocation]);

  if (isUserLoading || !user || user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B0B0C] text-foreground">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p>Verifying credentials...</p>
        </div>
      </div>
    );
  }

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
      toast.success("Logged out successfully");
      setLocation("/admin/login");
    } catch {
      toast.error("Logout failed");
    }
  };

  const handleStatusChange = async (id: number, status: BookingStatus) => {
    try {
      await updateBookingStatus.mutateAsync({ id, status });
      toast.success("Booking status updated");
      refetchBookings();
      refetchStats();
      if (selectedBooking && selectedBooking.id === id) {
        setSelectedBooking({ ...selectedBooking, status });
      }
    } catch (err: any) {
      toast.error(err?.message || "Failed to update status");
    }
  };

  const handleDeleteBooking = async (id: number) => {
    if (!confirm("Are you sure you want to delete this booking?")) return;
    try {
      await deleteBooking.mutateAsync({ id });
      toast.success("Booking deleted");
      setSelectedBooking(null);
      refetchBookings();
      refetchStats();
    } catch (err: any) {
      toast.error(err?.message || "Failed to delete booking");
    }
  };

  // Content form changes
  const handleContentSave = async (key: string, val: string) => {
    try {
      await updateContent.mutateAsync({ key, value: val });
      toast.success(`Saved setting: ${key}`);
      refetchContent();
    } catch (err: any) {
      toast.error(`Failed to save ${key}: ` + err.message);
    }
  };

  // Media files uploads
  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      toast.error("Please choose a file to upload");
      return;
    }

    setIsUploading(true);
    try {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onload = async () => {
        const base64 = reader.result as string;
        await uploadMedia.mutateAsync({
          fileName: selectedFile.name,
          fileBase64: base64,
          contentType: selectedFile.type,
          category: mediaCategory,
          title: mediaTitle,
          description: mediaDesc,
        });

        toast.success("Image uploaded successfully!");
        setSelectedFile(null);
        setMediaTitle("");
        setMediaDesc("");
        refetchMedia();
      };
    } catch (err: any) {
      toast.error("Upload failed: " + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteMedia = async (id: number) => {
    if (!confirm("Delete this image?")) return;
    try {
      await deleteMedia.mutateAsync({ id });
      toast.success("Image deleted");
      refetchMedia();
    } catch (err: any) {
      toast.error("Failed to delete media: " + err.message);
    }
  };

  // CSV Export
  const exportToCSV = () => {
    if (!bookings || bookings.length === 0) {
      toast.error("No bookings available to export");
      return;
    }

    const headers = ["ID", "Name", "Phone", "Vehicle Type", "Vehicle Model", "Preferred Date", "Preferred Time", "Notes", "Status", "Created At"];
    const rows = bookings.map(b => [
      b.id,
      b.name,
      b.phone,
      b.vehicleType,
      b.vehicleModel,
      b.preferredDate,
      b.preferredTime || "N/A",
      `"${(b.notes || "").replace(/"/g, '""')}"`,
      b.status,
      b.createdAt,
    ]);

    const csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `bookings_${new Date().toISOString().slice(0, 10)}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter and Search bookings
  const filteredBookings = (bookings || []).filter(b => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      b.name.toLowerCase().includes(query) ||
      b.phone.includes(query) ||
      b.vehicleModel.toLowerCase().includes(query);
    const matchesStatus = statusFilter === "all" || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <SEOHead title="Admin Dashboard - MR LUBE EXPERT" description="Content and Booking Management Panel" canonical="https://mrlubexpert.com/admin" />
      <div className="min-h-screen bg-[#0B0B0C] text-foreground flex flex-col md:flex-row">
        
        {/* Navigation Sidebar */}
        <aside className="w-full md:w-64 bg-[#141414] border-r border-border p-6 flex flex-col justify-between">
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold tracking-wider text-foreground" style={{ fontFamily: "Space Grotesk" }}>
                MR LUBE <span className="text-accent">EXPERT</span>
              </h2>
              <p className="text-xs text-secondary-foreground mt-1">Admin Dashboard</p>
            </div>

            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab("overview")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === "overview"
                    ? "bg-accent text-accent-foreground shadow-lg shadow-[#D2FF00]/10"
                    : "hover:bg-[#1D1D1D] text-secondary-foreground hover:text-foreground"
                }`}
              >
                <LayoutDashboard size={18} />
                Overview
              </button>
              <button
                onClick={() => setActiveTab("bookings")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === "bookings"
                    ? "bg-accent text-accent-foreground shadow-lg shadow-[#D2FF00]/10"
                    : "hover:bg-[#1D1D1D] text-secondary-foreground hover:text-foreground"
                }`}
              >
                <Calendar size={18} />
                Bookings
              </button>
              <button
                onClick={() => setActiveTab("media")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === "media"
                    ? "bg-accent text-accent-foreground shadow-lg shadow-[#D2FF00]/10"
                    : "hover:bg-[#1D1D1D] text-secondary-foreground hover:text-foreground"
                }`}
              >
                <ImageIcon size={18} />
                Media CMS
              </button>
              <button
                onClick={() => setActiveTab("content")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === "content"
                    ? "bg-accent text-accent-foreground shadow-lg shadow-[#D2FF00]/10"
                    : "hover:bg-[#1D1D1D] text-secondary-foreground hover:text-foreground"
                }`}
              >
                <Settings size={18} />
                Content Editor
              </button>
            </nav>
          </div>

          <div className="pt-6 border-t border-border">
            <div className="flex items-center gap-3 mb-4 px-2">
              <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-bold text-sm">
                A
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground capitalize">{user.name}</p>
                <p className="text-xs text-secondary-foreground truncate max-w-40">{user.email}</p>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full justify-start gap-2 border-destructive text-destructive hover:bg-destructive/10"
            >
              <LogOut size={16} />
              Logout
            </Button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6 md:p-10 overflow-y-auto max-w-7xl mx-auto w-full">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight capitalize" style={{ fontFamily: "Space Grotesk" }}>
                {activeTab} Management
              </h1>
              <p className="text-secondary-foreground text-sm">
                Perform administrative actions, update configurations and review statistics.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  refetchStats();
                  refetchBookings();
                  refetchMedia();
                  refetchContent();
                  toast.success("Data refreshed");
                }}
                className="border-border text-foreground hover:bg-[#1D1D1D]"
              >
                <RefreshCw size={16} />
              </Button>
            </div>
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                {[
                  { title: "Total Bookings", val: dashboardData?.stats.total ?? 0, desc: "All submissions", icon: FileText, color: "text-[#D2FF00]" },
                  { title: "Pending", val: dashboardData?.stats.pending ?? 0, desc: "Awaiting confirmation", icon: AlertCircle, color: "text-amber-500" },
                  { title: "Confirmed", val: dashboardData?.stats.confirmed ?? 0, desc: "Approved appointments", icon: Clock, color: "text-blue-400" },
                  { title: "Completed", val: dashboardData?.stats.completed ?? 0, desc: "Successfully resolved", icon: CheckCircle, color: "text-emerald-500" },
                  { title: "Reviews", val: dashboardData?.totalReviews ?? 0, desc: "Total customer reviews", icon: User, color: "text-[#FF6B00]" },
                ].map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <Card key={idx} className="bg-[#141414] border-border">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <span className="text-xs text-secondary-foreground font-semibold uppercase">{stat.title}</span>
                        <Icon size={18} className={stat.color} />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-foreground">{stat.val}</div>
                        <p className="text-[10px] text-secondary-foreground mt-1">{stat.desc}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Recent Bookings & Shortcuts */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="bg-[#141414] border-border lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold" style={{ fontFamily: "Space Grotesk" }}>Recent Booking Activity</CardTitle>
                    <CardDescription>Latest customer bookings received through the website</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {dashboardData?.recentBookings && dashboardData.recentBookings.length > 0 ? (
                        <div className="divide-y divide-border">
                          {dashboardData.recentBookings.map((booking: any) => (
                            <div key={booking.id} className="py-3 flex justify-between items-center first:pt-0 last:pb-0">
                              <div>
                                <p className="font-semibold text-foreground">{booking.name}</p>
                                <p className="text-xs text-secondary-foreground">{booking.vehicleModel} • {new Date(booking.preferredDate).toLocaleDateString()}</p>
                              </div>
                              <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                                booking.status === "PENDING" ? "bg-amber-500/10 text-amber-500" :
                                booking.status === "CONFIRMED" ? "bg-blue-400/10 text-blue-400" :
                                booking.status === "COMPLETED" ? "bg-emerald-500/10 text-emerald-500" :
                                "bg-destructive/10 text-destructive"
                              }`}>
                                {booking.status}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-secondary-foreground text-center py-6">No bookings yet.</p>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Quick actions panel */}
                <Card className="bg-[#141414] border-border">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold" style={{ fontFamily: "Space Grotesk" }}>Quick Actions</CardTitle>
                    <CardDescription>Shortcut utilities</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button onClick={() => setActiveTab("bookings")} className="w-full justify-start gap-2 bg-[#1D1D1D] hover:bg-[#2A2A2B] text-foreground border border-border">
                      <Search size={16} />
                      Search & Filter Bookings
                    </Button>
                    <Button onClick={() => setActiveTab("media")} className="w-full justify-start gap-2 bg-[#1D1D1D] hover:bg-[#2A2A2B] text-foreground border border-border">
                      <Plus size={16} />
                      Upload New Image
                    </Button>
                    <Button onClick={() => setActiveTab("content")} className="w-full justify-start gap-2 bg-[#1D1D1D] hover:bg-[#2A2A2B] text-foreground border border-border">
                      <Settings size={16} />
                      Edit Website Info
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* TAB 2: BOOKINGS */}
          {activeTab === "bookings" && (
            <div className="space-y-6">
              {/* Search & Export bar */}
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-secondary-foreground" />
                    <Input
                      type="text"
                      placeholder="Search name, phone, model..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-[#141414] border-border text-foreground pl-10 w-full sm:w-64"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="bg-[#141414] border-border w-full sm:w-44 text-foreground">
                      <SelectValue placeholder="Filter by Status" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#141414] border-border text-foreground">
                      <SelectItem value="all">All Bookings</SelectItem>
                      <SelectItem value="PENDING">PENDING</SelectItem>
                      <SelectItem value="CONFIRMED">CONFIRMED</SelectItem>
                      <SelectItem value="COMPLETED">COMPLETED</SelectItem>
                      <SelectItem value="CANCELLED">CANCELLED</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={exportToCSV} className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90 gap-2 font-semibold">
                  <Download size={16} />
                  Export to CSV
                </Button>
              </div>

              {/* Bookings Table */}
              <Card className="bg-[#141414] border-border overflow-hidden">
                <Table>
                  <TableHeader className="bg-[#1D1D1D] hover:bg-[#1D1D1D]">
                    <TableRow>
                      <TableHead className="text-foreground font-semibold">Customer</TableHead>
                      <TableHead className="text-foreground font-semibold">Vehicle</TableHead>
                      <TableHead className="text-foreground font-semibold">Preferred Date</TableHead>
                      <TableHead className="text-foreground font-semibold">Status</TableHead>
                      <TableHead className="text-foreground font-semibold text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isBookingsLoading ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8">Loading bookings...</TableCell>
                      </TableRow>
                    ) : filteredBookings.length > 0 ? (
                      filteredBookings.map((b) => (
                        <TableRow key={b.id} className="border-border hover:bg-[#1D1D1D]/50">
                          <TableCell>
                            <p className="font-semibold text-foreground">{b.name}</p>
                            <p className="text-xs text-secondary-foreground">{b.phone}</p>
                          </TableCell>
                          <TableCell>
                            <p className="text-foreground capitalize">{b.vehicleType.replace("_", " ")}</p>
                            <p className="text-xs text-secondary-foreground">{b.vehicleModel}</p>
                          </TableCell>
                          <TableCell>
                            <p className="text-foreground">{new Date(b.preferredDate).toLocaleDateString()}</p>
                            <p className="text-xs text-secondary-foreground">{b.preferredTime || "N/A"}</p>
                          </TableCell>
                          <TableCell>
                            <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                              b.status === "PENDING" ? "bg-amber-500/10 text-amber-500" :
                              b.status === "CONFIRMED" ? "bg-blue-400/10 text-blue-400" :
                              b.status === "COMPLETED" ? "bg-emerald-500/10 text-emerald-500" :
                              "bg-destructive/10 text-destructive"
                            }`}>
                              {b.status}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex gap-2 justify-end">
                              <Button
                                size="sm"
                                onClick={() => setSelectedBooking(b)}
                                className="bg-[#1D1D1D] hover:bg-[#2A2A2B] text-foreground border border-border"
                              >
                                View Details
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-destructive/30 hover:bg-destructive/10 text-destructive"
                                onClick={() => handleDeleteBooking(b.id)}
                              >
                                <Trash2 size={14} />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-secondary-foreground">No bookings found matching query</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </Card>

              {/* Booking Details Modal */}
              {selectedBooking && (
                <div className="fixed inset-0 z-50 bg-[#0B0B0C]/80 backdrop-blur-sm flex items-center justify-center p-4">
                  <Card className="w-full max-w-lg bg-[#141414] border-border text-foreground shadow-2xl">
                    <CardHeader className="border-b border-border pb-4">
                      <CardTitle className="text-2xl font-bold flex justify-between items-center" style={{ fontFamily: "Space Grotesk" }}>
                        Booking Details
                        <Button variant="ghost" size="sm" onClick={() => setSelectedBooking(null)} className="text-secondary-foreground hover:text-foreground">✕</Button>
                      </CardTitle>
                      <CardDescription>Status update and full metadata viewer</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-6">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-xs text-secondary-foreground">Customer Name</p>
                          <p className="font-semibold text-foreground mt-0.5">{selectedBooking.name}</p>
                        </div>
                        <div>
                          <p className="text-xs text-secondary-foreground">Phone Number</p>
                          <p className="font-semibold text-foreground mt-0.5">{selectedBooking.phone}</p>
                        </div>
                        <div>
                          <p className="text-xs text-secondary-foreground">Vehicle Type</p>
                          <p className="font-semibold text-foreground mt-0.5 capitalize">{selectedBooking.vehicleType.replace("_", " ")}</p>
                        </div>
                        <div>
                          <p className="text-xs text-secondary-foreground">Vehicle Model</p>
                          <p className="font-semibold text-foreground mt-0.5">{selectedBooking.vehicleModel}</p>
                        </div>
                        <div>
                          <p className="text-xs text-secondary-foreground">Preferred Date</p>
                          <p className="font-semibold text-foreground mt-0.5">{new Date(selectedBooking.preferredDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-secondary-foreground">Preferred Time</p>
                          <p className="font-semibold text-foreground mt-0.5">{selectedBooking.preferredTime || "N/A"}</p>
                        </div>
                      </div>

                      <div className="pt-2">
                        <p className="text-xs text-secondary-foreground">Additional Notes</p>
                        <p className="text-sm bg-[#1D1D1D] p-3 rounded-md border border-border mt-1 min-h-16 whitespace-pre-wrap">
                          {selectedBooking.notes || "No notes provided"}
                        </p>
                      </div>

                      <div className="pt-2">
                        <p className="text-xs text-secondary-foreground mb-2">Update Booking Status</p>
                        <div className="grid grid-cols-4 gap-2">
                          {(["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"] as BookingStatus[]).map((st) => (
                            <Button
                              key={st}
                              onClick={() => handleStatusChange(selectedBooking.id, st)}
                              className={`text-xs py-2 h-auto ${
                                selectedBooking.status === st
                                  ? "bg-accent text-accent-foreground font-bold"
                                  : "bg-[#1D1D1D] hover:bg-[#2A2A2B] text-foreground border border-border"
                              }`}
                            >
                              {st}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: MEDIA */}
          {activeTab === "media" && (
            <div className="space-y-8">
              {/* Image Upload Form */}
              <Card className="bg-[#141414] border-border">
                <CardHeader>
                  <CardTitle className="text-lg font-bold" style={{ fontFamily: "Space Grotesk" }}>Upload Media File</CardTitle>
                  <CardDescription>Select a category and upload images directly to the Media Library.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleFileUpload} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs text-secondary-foreground">Category</label>
                        <Select value={mediaCategory} onValueChange={setMediaCategory}>
                          <SelectTrigger className="bg-[#1D1D1D] border-border text-foreground">
                            <SelectValue placeholder="Category" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#141414] border-border text-foreground">
                            <SelectItem value="gallery">Workshop Gallery</SelectItem>
                            <SelectItem value="services">Services Thumbnails</SelectItem>
                            <SelectItem value="hero">Hero Section</SelectItem>
                            <SelectItem value="about">About Us</SelectItem>
                            <SelectItem value="testimonials">Testimonials</SelectItem>
                            <SelectItem value="banners">Promotional Banners</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs text-secondary-foreground">Title (Optional)</label>
                        <Input
                          type="text"
                          placeholder="Image Title"
                          value={mediaTitle}
                          onChange={(e) => setMediaTitle(e.target.value)}
                          className="bg-[#1D1D1D] border-border text-foreground"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs text-secondary-foreground">Description (Optional)</label>
                        <Input
                          type="text"
                          placeholder="Short description"
                          value={mediaDesc}
                          onChange={(e) => setMediaDesc(e.target.value)}
                          className="bg-[#1D1D1D] border-border text-foreground"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pt-2">
                      <div className="w-full sm:w-auto">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                          className="bg-[#1D1D1D] border-border text-foreground cursor-pointer"
                        />
                      </div>
                      <Button
                        type="submit"
                        disabled={isUploading || !selectedFile}
                        className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90 gap-2 font-semibold"
                      >
                        {isUploading ? "Uploading..." : "Upload Image"}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>

              {/* Media Display List */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold" style={{ fontFamily: "Space Grotesk" }}>Media Library Files</h3>
                {isMediaLoading ? (
                  <p className="text-secondary-foreground text-sm">Loading media items...</p>
                ) : mediaItems && mediaItems.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {mediaItems.map((item) => (
                      <Card key={item.id} className="bg-[#141414] border-border overflow-hidden relative group">
                        <div className="h-40 bg-secondary overflow-hidden">
                          <img
                            src={item.url}
                            alt={item.title || "Uploaded media"}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-3">
                          <p className="font-semibold text-sm text-foreground truncate">{item.title || "Untitled"}</p>
                          <div className="flex justify-between items-center mt-1">
                            <span className="text-[9px] font-bold text-accent uppercase bg-accent/10 px-1.5 py-0.5 rounded">
                              {item.category}
                            </span>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-7 w-7 p-0 border-destructive/20 hover:bg-destructive/10 text-destructive"
                              onClick={() => handleDeleteMedia(item.id)}
                            >
                              <Trash2 size={12} />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-secondary-foreground text-sm bg-[#141414] border border-border p-6 rounded-lg text-center">
                    No images uploaded yet. Upload your first image above!
                  </p>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: CONTENT EDITOR */}
          {activeTab === "content" && (
            <div className="space-y-6">
              <Card className="bg-[#141414] border-border">
                <CardHeader>
                  <CardTitle className="text-lg font-bold" style={{ fontFamily: "Space Grotesk" }}>Dynamic Site Configurations</CardTitle>
                  <CardDescription>Modify static texts dynamically without redeploying code.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* HERO SECTION */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-accent border-b border-border pb-1">Hero Section</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs text-secondary-foreground">Hero Headline Title</label>
                        <Input
                          type="text"
                          value={contentForm["hero_title"] || ""}
                          placeholder="Precision Vehicle Care"
                          onChange={(e) => setContentForm({ ...contentForm, hero_title: e.target.value })}
                        />
                        <Button size="sm" onClick={() => handleContentSave("hero_title", contentForm["hero_title"])} className="bg-accent text-accent-foreground text-xs mt-1">
                          Save Headline
                        </Button>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs text-secondary-foreground">Hero Subtitle</label>
                        <Textarea
                          value={contentForm["hero_subtitle"] || ""}
                          placeholder="Professional automotive service and repair solutions..."
                          onChange={(e) => setContentForm({ ...contentForm, hero_subtitle: e.target.value })}
                        />
                        <Button size="sm" onClick={() => handleContentSave("hero_subtitle", contentForm["hero_subtitle"])} className="bg-accent text-accent-foreground text-xs mt-1">
                          Save Subtitle
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* CONTACT & BUSINESS INFO */}
                  <div className="space-y-4 pt-4">
                    <h4 className="text-sm font-bold text-accent border-b border-border pb-1">Contact & Business Hours</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs text-secondary-foreground">Store Address</label>
                        <Input
                          type="text"
                          value={contentForm["contact_address"] || ""}
                          placeholder="Opp. Murdeshwar Factory..."
                          onChange={(e) => setContentForm({ ...contentForm, contact_address: e.target.value })}
                        />
                        <Button size="sm" onClick={() => handleContentSave("contact_address", contentForm["contact_address"])} className="bg-accent text-accent-foreground text-xs mt-1">
                          Save Address
                        </Button>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs text-secondary-foreground">Phone Numbers (comma separated)</label>
                        <Input
                          type="text"
                          value={contentForm["contact_phones"] || ""}
                          placeholder="+91 9538223688, +91 7676317355"
                          onChange={(e) => setContentForm({ ...contentForm, contact_phones: e.target.value })}
                        />
                        <Button size="sm" onClick={() => handleContentSave("contact_phones", contentForm["contact_phones"])} className="bg-accent text-accent-foreground text-xs mt-1">
                          Save Phone Numbers
                        </Button>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs text-secondary-foreground">Business Hours Description</label>
                        <Textarea
                          value={contentForm["business_hours"] || ""}
                          placeholder="Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 9:00 AM - 2:00 PM\nSunday: Closed"
                          onChange={(e) => setContentForm({ ...contentForm, business_hours: e.target.value })}
                        />
                        <Button size="sm" onClick={() => handleContentSave("business_hours", contentForm["business_hours"])} className="bg-accent text-accent-foreground text-xs mt-1">
                          Save Hours
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* SEO METADATA */}
                  <div className="space-y-4 pt-4">
                    <h4 className="text-sm font-bold text-accent border-b border-border pb-1">SEO Metadata & Social Links</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs text-secondary-foreground">SEO Meta Description</label>
                        <Textarea
                          value={contentForm["seo_description"] || ""}
                          placeholder="Premium automotive service center in Hubli..."
                          onChange={(e) => setContentForm({ ...contentForm, seo_description: e.target.value })}
                        />
                        <Button size="sm" onClick={() => handleContentSave("seo_description", contentForm["seo_description"])} className="bg-accent text-accent-foreground text-xs mt-1">
                          Save SEO Description
                        </Button>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs text-secondary-foreground">WhatsApp Chat Link</label>
                        <Input
                          type="text"
                          value={contentForm["whatsapp_link"] || ""}
                          placeholder="https://wa.me/919538223688"
                          onChange={(e) => setContentForm({ ...contentForm, whatsapp_link: e.target.value })}
                        />
                        <Button size="sm" onClick={() => handleContentSave("whatsapp_link", contentForm["whatsapp_link"])} className="bg-accent text-accent-foreground text-xs mt-1">
                          Save WhatsApp Link
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
