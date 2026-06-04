# Airline Loyalty Intelligence Dashboard

## Overview

A highly polished, executive-level airline customer loyalty analytics dashboard designed for presentation to airline leadership, retention managers, and business stakeholders. This production-grade dashboard provides comprehensive behavioral churn prediction and customer retention analytics.

## Features

### Executive KPI Overview
- **8 Key Performance Indicators** with animated counters
- Real-time metrics including Total Customers, Churn Risk %, Average CLV, Engagement Score
- Visual indicators for high-value and at-risk premium customers

### Customer Segmentation Intelligence
- **Customer Type Distribution** - Interactive donut chart showing segment breakdown
- **CLV Across Segments** - Box plot analysis revealing value concentration
- **Segment Heatmap** - Cross-analysis of customer types vs. value segments

### Churn Risk Analytics
- **Churn Risk Split** - Radial gauge visualization of risk distribution
- **Churn Driver Importance** - Ranked feature importance analysis
- **Behavioral Decline Analysis** - Scatter plot identifying disengaging high-value customers

### Customer Value Intelligence
- **CLV Distribution** - Histogram with density curves
- **Loyalty Card Performance** - Multi-metric comparison across tiers
- **Geographic Intelligence** - Regional customer concentration and risk analysis

### Retention Strategy Engine
- **Interactive Strategy Matrix** - Actionable recommendations by customer segment
- Priority-coded retention actions with expected impact

### Executive Insights Panel
- **AI-Style Insights** - Automatically surfaced key observations
- Strategic business intelligence statements
- Data-driven retention recommendations

### Predictive Model Performance
- **Model Metrics** - Accuracy, Precision, Recall, F1 Score
- **Confusion Matrix** - Visual model evaluation
- Performance interpretation for stakeholders

## 🎨 Design Features

- **Premium Typography** - Poppins font family throughout
- **Clean Modern Aesthetic** - White/light neutral background with card-based layout
- **Smooth Animations** - Animated transitions for chart rendering and KPI counters
- **Interactive Filters** - 7 global filters with cross-filtering capabilities
- **Responsive Layout** - Adapts to different screen sizes
- **Professional Color Scheme** - Enterprise analytics theme
- **Hover Tooltips** - Contextual information on demand

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional, for CSV loading)

### Installation

1. **Clone or download** all files to a directory:
   - `dashboard.html`
   - `styles.css`
   - `app.js`
   - `customer_summary.csv` (optional - sample data included)

2. **Open the dashboard**:
   
   **Option A: Direct File Opening**
   ```
   Simply open dashboard.html in your web browser
   ```
   
   **Option B: Local Web Server (Recommended)**
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js
   npx http-server
   
   # Then navigate to http://localhost:8000/dashboard.html
   ```

### Using Your Own Data

Replace `customer_summary.csv` with your processed airline loyalty dataset. Required columns:

```
Customer_ID, Loyalty_Card, Province, Education, Marital_Status, 
Customer_Type, Churn_Risk, Value_Segment, CLV, Engagement_Score, 
Total_Flights, Total_Distance, Total_Points_Earned, 
Total_Points_Redeemed, Customer_Tenure, Salary
```

**Expected Values:**
- `Customer_Type`: Loyal High Value, Stable, Disengaged, At-Risk Premium
- `Churn_Risk`: High, Low
- `Value_Segment`: High Value, Medium Value, Low Value
- `Loyalty_Card`: Star, Nova, Aurora (or your tier names)

## 📊 Dashboard Sections

### 1. Global Filters (Top Panel)
Filter by:
- Loyalty Card Tier
- Province/Region
- Education Level
- Marital Status
- Customer Type
- Churn Risk
- Customer Value Segment

All visualizations update dynamically based on selections.

### 2. Executive KPI Cards
8 animated metric cards displaying:
- Total customer base
- Churn risk percentage
- Average customer lifetime value
- Average engagement score
- Total flights and distance
- High-value customer count
- At-risk premium customers

### 3. Customer Segmentation Intelligence
Three visualizations analyzing customer segments:
- Distribution across customer types
- CLV spread by segment
- Heatmap of type vs. value overlap

### 4. Churn Risk Analytics
Three visualizations focused on churn:
- Risk distribution (high vs. low)
- Feature importance ranking
- Behavioral decline patterns

### 5. Customer Value Intelligence
Three visualizations on customer value:
- CLV distribution histogram
- Loyalty tier performance comparison
- Geographic customer analysis

### 6. Retention Strategy Matrix
Interactive table with:
- Customer segment
- Risk level assessment
- Recommended retention actions
- Priority coding (Critical/High/Medium/Low)
- Expected business impact

### 7. Executive Insights Panel
Auto-generated insights including:
- Strongest churn predictors
- Largest customer segments
- High-risk value groups
- Strategic recommendations

### 8. Predictive Model Performance
Model evaluation metrics:
- Classification accuracy
- Precision and recall
- F1 score
- Confusion matrix visualization

## 🎯 Use Cases

### For Airline Leadership
- Strategic overview of customer base health
- Revenue risk assessment
- Investment prioritization for retention programs

### For Retention Managers
- Identification of at-risk premium customers
- Actionable retention strategies by segment
- Performance tracking of loyalty programs

### For Business Stakeholders
- ROI analysis of customer segments
- Geographic expansion opportunities
- Data-driven decision support

## 🔧 Customization

### Modify Colors
Edit `styles.css` CSS variables:
```css
:root {
    --primary-color: #2563eb;
    --success-color: #10b981;
    --danger-color: #ef4444;
    /* ... */
}
```

### Adjust Chart Layouts
Edit `app.js` chart configuration:
```javascript
const chartLayout = {
    font: { family: 'Poppins, sans-serif' },
    /* ... */
};
```

### Add Custom Insights
Modify the `renderInsightsPanel()` function in `app.js`

## 📦 Dependencies

- **Plotly.js** (v2.27.0) - Interactive charting library
- **PapaParse** (v5.4.1) - CSV parsing
- **Google Fonts** - Poppins font family

All dependencies are loaded via CDN - no installation required.

## 🌐 Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📱 Responsive Design

The dashboard is fully responsive and adapts to:
- Desktop (1920px+)
- Laptop (1024px - 1920px)
- Tablet (768px - 1024px)
- Mobile (< 768px)

## 🎬 Demo Features

If `customer_summary.csv` is not found, the dashboard automatically generates 5,000 sample customer records for demonstration purposes.

## 🔒 Data Privacy

This dashboard runs entirely in the browser. No data is transmitted to external servers. All processing happens client-side.

## 📄 License

This dashboard is provided as-is for airline customer analytics purposes.

## 🤝 Support

For questions or customization requests, refer to the inline code comments in `app.js` and `styles.css`.

## 🎓 Technical Notes

### Performance
- Handles datasets up to 50,000 customers efficiently
- Smooth animations with 60fps transitions
- Optimized chart rendering with Plotly

### Data Processing
- Real-time filtering across all visualizations
- Cross-filtering support
- Aggregation and statistical calculations

### Accessibility
- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- High contrast color schemes

## 🚀 Future Enhancements

Potential additions:
- PDF export functionality
- Real-time data refresh
- Drill-down capabilities
- Custom date range filtering
- Predictive scenario modeling
- A/B testing for retention strategies

---

**Built with ❤️ for airline customer intelligence**
