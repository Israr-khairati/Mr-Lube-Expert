const fs = require('fs');
const path = require('path');
const https = require('https');

const clientSrcDir = path.join(__dirname, 'client', 'src');
const publicImagesDir = path.join(__dirname, 'client', 'public', 'images');

if (!fs.existsSync(publicImagesDir)) {
    fs.mkdirSync(publicImagesDir, { recursive: true });
}

// A curated list of car repair/mechanic Unsplash image URLs
const imageSources = [
    "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1503375830086-4f7f2b18400f?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1530906358829-e84b2769270f?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1632823462943-41bb7ba591f4?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1507133750073-10825927d3c5?auto=format&fit=crop&w=800&q=80"
];

function downloadFile(url, dest) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode === 301 || res.statusCode === 302) {
                return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
            }
            const file = fs.createWriteStream(dest);
            res.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => {});
            reject(err);
        });
    });
}

function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDirectory(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            const regex = /\/manus-storage\/([a-zA-Z0-9_]+)\.(jpg|jpeg|png|webp)/g;
            let match;
            let matches = new Set();
            while ((match = regex.exec(content)) !== null) {
                matches.add(match[0]);
            }

            if (matches.size > 0) {
                console.log(`Processing ${fullPath}... Found ${matches.size} image references.`);
                for (const oldUrl of matches) {
                    const parts = oldUrl.split('/');
                    const filename = parts[parts.length - 1];
                    const newUrl = `/images/${filename}`;
                    
                    // Replace in file content
                    content = content.split(oldUrl).join(newUrl);
                    
                    // Trigger download if doesn't exist
                    const destPath = path.join(publicImagesDir, filename);
                    if (!fs.existsSync(destPath)) {
                        const randomSource = imageSources[Math.floor(Math.random() * imageSources.length)];
                        downloadQueue.push({ url: randomSource, dest: destPath });
                    }
                }
                fs.writeFileSync(fullPath, content, 'utf8');
            }
        }
    }
}

const downloadQueue = [];

async function main() {
    console.log("Scanning files for /manus-storage/ links...");
    processDirectory(clientSrcDir);
    
    // De-duplicate download queue
    const uniqueDownloads = Array.from(new Map(downloadQueue.map(item => [item.dest, item])).values());
    console.log(`Downloading ${uniqueDownloads.length} images...`);
    
    let count = 0;
    for (const item of uniqueDownloads) {
        console.log(`Downloading image ${++count}/${uniqueDownloads.length}: ${path.basename(item.dest)}`);
        try {
            await downloadFile(item.url, item.dest);
        } catch (e) {
            console.error("Failed to download", item.url, e.message);
        }
    }
    console.log("All done!");
}

main().catch(console.error);
