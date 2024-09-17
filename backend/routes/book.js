const router = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const Book = require("../models/book");
const { authenticateToken } = require("./userAuth");

// Add book -- admin
router.post("/add-book", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const user = await User.findById(id);
        if (user.role !== "admin") {
            return res.status(400).json({ message: "You are not authorized to perform admin work" });
        }

        // Check if ISBN is provided and unique
        if (!req.body.ISBN) {
            return res.status(400).json({ message: "ISBN is required" });
        }
        
        const existingBook = await Book.findOne({ ISBN: req.body.ISBN });
        if (existingBook) {
            return res.status(400).json({ message: "A book with this ISBN already exists" });
        }

        const book = new Book({
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language,
            ISBN: req.body.ISBN // Ensure ISBN is included
        });
        await book.save();
        res.status(200).json({ message: "Book added successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

// Update book -- admin
router.post("/update-book", authenticateToken, async (req, res) => {
    try {
        const { bookid } = req.headers;

        if (!bookid) {
            return res.status(400).json({ message: "Book ID is required" });
        }

        const book = await Book.findById(bookid);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        if (req.body.ISBN && req.body.ISBN !== book.ISBN) {
            const existingBook = await Book.findOne({ ISBN: req.body.ISBN });
            if (existingBook) {
                return res.status(400).json({ message: "A book with this ISBN already exists" });
            }
        }

        await Book.findByIdAndUpdate(bookid, {
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language,
            ISBN: req.body.ISBN // Ensure ISBN is included
        });

        return res.status(200).json({ message: "Book updated successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

module.exports = router;
