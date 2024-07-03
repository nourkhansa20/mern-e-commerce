import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import sharp from 'sharp';
import { Product } from '../database/models/Product.js';
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from '../controllers/product.js'; // Importing createProduct function

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const productId = req.params.productId;
        const uploadPath = `images/${productId}`;
        fs.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

async function deleteFile(filePath) {
    try {
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error(err);
            } else {
                console.log('File is deleted.');
            }
        });
        console.log('File deleted successfully');
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.log('File does not exist.');
        } else {
            console.error('Error deleting file:', err);
        }
    }
}

router.post('/upload/:productId', upload.array('images', 10), async (req, res) => {
    const productId = req.params.productId;
    const files = req.files;


    if (!productId) {
        return res.status(400).json({ error: 'Missing productId' });
    }

    try {
        const imagePaths = await Promise.all(files.map(async (file) => {
            const fileExt = path.extname(file.path).toLowerCase();

            if (fileExt === '.webp') {
                // If the file is already a webp, return its path
                return file.path;
            }

            const outputDir = path.join('images', productId);
            const outputPath = path.join(outputDir, `${path.basename(file.path, fileExt)}.webp`);

            // Ensure the output directory exists
            fs.mkdirSync(outputDir, { recursive: true });

            await sharp(file.path)
                .webp({ quality: 80 })
                .toFile(outputPath);

            // Delete the original file after conversion
            // await deleteFile(file.path);

            return outputPath;
        }));

        // Example saving paths to MongoDB or any other database:
        await Product.findByIdAndUpdate(productId, { $push: { images: imagePaths } }, { new: true });

        res.json({ message: 'Images uploaded and converted successfully' });
    } catch (err) {
        console.error('Error processing images:', err);
        res.status(500).json({ error: 'Error processing images' });
    }
});

// Assuming createProduct is defined in another file or module
router.post('/', createProduct);
router.get('/', getProducts);
router.get('/:id', getProductById);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;
