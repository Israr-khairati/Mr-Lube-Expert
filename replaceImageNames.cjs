const fs = require('fs');
const path = require('path');

const clientSrcDir = path.join(__dirname, 'client', 'src');

const replacements = {
    'gVuhwGr7lPrz_8caffc3d.jpg': 'ac_service.png',
    'Cu02WZeqh7q6_fc3fddc9.jpg': 'brake_service.png',
    'QniZfkKdPqxZ_6f4e0fe2.jpg': 'suspension_repair.png',
    'YF52zqYqcTcb_e2922f84.webp': 'tire_service.png',
    'DvrCcbE64upR_f958e6eb.jpg': 'foam_wash.png',
    'vftwZxcyLzT8_34ac5bd4.jpg': 'engine_inspection.png',
    'gPQRhUy3MbXX_3230802c.jpg': 'paint_protection.png'
};

function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDirectory(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let changed = false;
            
            for (const [oldName, newName] of Object.entries(replacements)) {
                if (content.includes(oldName)) {
                    content = content.split(oldName).join(newName);
                    changed = true;
                }
            }
            
            if (changed) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated ${fullPath}`);
            }
        }
    }
}

processDirectory(clientSrcDir);
console.log('Done replacing image names.');
