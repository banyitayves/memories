# 📚 Academic Library Chat

A comprehensive web application for summarizing academic documents and answering questions from exam/quiz papers.

## ✨ Features

### 1. **Intelligent Document Summarization**
- Upload academic documents (PDFs, TXT, Word files, etc.)
- Generates accurate summaries using **sentence scoring and TF-IDF analysis**
- Extracts actual key sentences from the document (not placeholder text)
- Choose from three summary lengths:
  - **Short**: Top 3 key insights
  - **Medium**: Top 5 key insights
  - **Long**: Up to 8 key insights
- Provides document statistics including readability score

### 2. **Question Paper Processing**
- **Automatic Detection**: Detects when an uploaded file is a question paper
- **Question Extraction**: Automatically extracts and parses questions from papers
- **Question Browser**: View all questions from a question paper in the Q&A tab
- **One-Click Loading**: Click any question to load it directly into the Q&A input

### 3. **Intelligent Q&A Assistant**
- Answers questions based on actual document content
- **Context-Aware Responses**: Finds relevant sentences from your documents
- **Question Type Recognition**:
  - Definition/What questions
  - Why/Explanation questions
  - How-to questions
  - When/Timeline questions
  - Where/Location questions
  - General academic questions
- **Multi-Document Support**: Can answer questions by searching across multiple documents
- **Real-Time Relevance Matching**: Finds the most relevant content for each question

## 🚀 How to Use

### Getting Started
1. Simply open `index.html` in any modern web browser
2. The app comes with sample documents pre-loaded:
   - "Introduction to Psychology"
   - "History of Ancient Rome"
   - "Sample Exam Questions" (demonstrates question paper feature)

### Summarizing Documents
1. Go to the **📋 Summarizer** tab
2. Select a document from the dropdown
3. Choose your preferred summary length (Short, Medium, or Long)
4. Click **Generate Summary**
5. The summary will display key points extracted directly from the document

### Answering Questions
1. Go to the **❓ Q&A Assistant** tab
2. **Option A - Manual Questions**: 
   - Type your question in the input field
   - Press Enter or click Send
3. **Option B - Question Papers**:
   - Select a question paper from the dropdown
   - Click on any question from the list below
   - The question will load in the input field
   - Click Send to get the answer

### Uploading Your Own Documents
1. Click **Browse Files** in the sidebar OR drag files into the upload area
2. Supported formats: PDF, TXT, DOC, DOCX
3. The system will:
   - Automatically detect if it's a question paper
   - Extract questions if it's a question paper
   - Add it to the document list

## 📊 How It Works

### Summarization Algorithm
- **Sentence Extraction**: Breaks document into sentences
- **TF-IDF Scoring**: Calculates importance of words
- **Sentence Ranking**: Scores each sentence based on keyword frequency
- **Normalization**: Prevents bias toward long sentences
- **Keyword Extraction**: Identifies main topics with relevance scores
- **Readability Analysis**: Flesch Kincaid grade level calculation

### Question Answering
- **Semantic Matching**: Finds sentences containing question keywords
- **Relevance Scoring**: Scores sentences by relevance to the question
- **Multi-Sentence Synthesis**: Combines multiple relevant sentences
- **Smart Formatting**: Formats answers based on question type
- **Source Attribution**: Notes that answers are from the document

### Question Paper Detection
- Recognizes patterns like:
  - Numbered questions (1. 2. a) b))
  - Question markers (Q. Q1 Question 1)
  - Common question starters (What, Why, How, When, etc.)
  - Multiple choice indicators

## 🎨 User Interface
- **Modern Design**: Purple and blue gradient theme
- **Responsive Layout**: Works on desktop and tablets
- **Smooth Animations**: Slide-in effects for messages
- **Interactive Elements**: Hover effects and smooth transitions
- **Clear Typography**: Easy-to-read fonts and spacing

## ⌨️ Keyboard Shortcuts
- **Ctrl+K**: Focus on the question input field
- **Ctrl+D**: Clear all documents (with confirmation)
- **Enter**: Send question from Q&A assistant

## 📁 File Structure
```
book-library-chat/
├── index.html        # Main HTML structure
├── styles.css        # Complete styling and animations
├── script.js         # JavaScript logic and algorithms
└── README.md         # This file
```

## 🔧 Technologies Used
- **HTML5**: Semantic markup
- **CSS3**: Animations, gradients, and responsive design
- **JavaScript (ES6)**: DOM manipulation and text analysis algorithms
- **No Dependencies**: Works completely offline with no external libraries

## 💡 Tips for Best Results
1. **For Summarization**: Use documents with clear sentence structure
2. **For Q&A**: Ask specific, well-formed questions
3. **For Question Papers**: Format questions in standard numbering style (1. 2. a) b))
4. **Multiple Documents**: Upload related documents for better answers

## 🌟 Features Showcase
- ✅ Real text analysis (not placeholder responses)
- ✅ Automatic question paper detection
- ✅ Question extraction and parsing
- ✅ TF-IDF keyword extraction
- ✅ Sentence-based summarization
- ✅ Context-aware question answering
- ✅ Readability scoring
- ✅ Beautiful, modern UI
- ✅ Fully functional offline
- ✅ No server required

## 📝 Notes
- The application runs entirely in your browser
- Documents are stored in browser memory (lost on refresh)
- Perfect for students, researchers, and educators
- Can be packaged as a desktop app using Electron if needed

---
**Version 2.0** - Enhanced with intelligent summarization and question paper processing
