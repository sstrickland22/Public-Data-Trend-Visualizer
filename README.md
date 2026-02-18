# Public Data Trend Visualizer

An interactive data visualization tool that displays public data trends across multiple sectors from 2000–2025.

## 🌐 Live Demo
[View Live Chart](https://sstrickland22.github.io/Public-Data-Trend-Visualizer)

## 📊 What It Shows
This chart visualizes growth trends across three sectors:
- **Technology** - Fastest growing sector (100 → 360)
- **Healthcare** - Steady consistent growth (80 → 260)
- **Education** - Gradual stable growth (60 → 185)

## ✨ Features
- 📈 Multi-line chart with 3 datasets
- 🔵 Interactive data points on each line
- 💬 Tooltips showing Year and Value on hover
- 👆 Click legend to toggle lines on/off
- 📊 Data summary cards
- 🗂 Color coded legend with descriptions
- 📱 Clean responsive layout

## 🗂 Project Structure
Public-Data-Trend-Visualizer/
├── index.html          # Main page with legend and layout
├── script.js           # D3.js chart logic
├── style.css           # Styling
├── data.csv            # Dataset (Technology, Healthcare, Education)
├── data_cleaning/      # Data cleaning scripts
│   ├── cleaning_functions.py
│   └── init.py
├── tests/              # Test files
├── requirements.txt    # Python dependencies
└── README.md           # Project documentation

## 🛠 Built With
- [D3.js v7](https://d3js.org/) - Data visualization
- HTML/CSS/JavaScript - Frontend
- Python - Data cleaning pipeline
- GitHub Pages - Deployment

## 🚀 Run Locally
```bash
# Clone the repo
git clone https://github.com/sstrickland22/Public-Data-Trend-Visualizer.git

# Navigate to project
cd Public-Data-Trend-Visualizer

# Start local server
python3 -m http.server 8000

# Open in browser
http://localhost:8000
