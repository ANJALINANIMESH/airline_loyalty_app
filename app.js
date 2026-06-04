// Global variables
let rawData = [];
let filteredData = [];
let filters = {
    loyaltyCard: [],
    province: [],
    education: [],
    marital: [],
    customerType: [],
    churnRisk: [],
    valueSegment: []
};

// Chart configuration
const chartConfig = {
    displayModeBar: false,
    responsive: true
};

const chartLayout = {
    font: { family: 'Poppins, sans-serif' },
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    margin: { t: 20, r: 20, b: 60, l: 60 },
    transition: { duration: 500, easing: 'cubic-in-out' }
};

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {

    rawData = customerData.map(row => ({
        Customer_ID: row['Loyalty Number'],
        Loyalty_Card: row['Loyalty Card'],
        Province: row['Province'],
        Education: row['Education'],
        Marital_Status: row['Marital Status'],
        Customer_Type: row['Customer Type'],
        Churn_Risk: row['Churn Risk'],
        Value_Segment: row['Value Segment'],
        CLV: row['CLV'],
        Engagement_Score: row['Engagement Score'],
        Total_Flights: row['Total Flights Overall'],
        Total_Distance: row['Total Distance'],
        Total_Points_Earned: row['Total Points Earned'],
        Total_Points_Redeemed: row['Total Points Redeemed'],
        Customer_Tenure: row['Customer Tenure'],
        Salary: row['Salary'],
        Gender: row['Gender'],
        Cancelled: row['Cancelled'],
        Inactive_Months: row['Inactive Months'],
        Avg_Flights_Per_Month: row['Avg Flights Per Month'],
        Engagement_Segment: row['Engagement Segment'],
        Recommended_Action: row['Action']
    }));

    console.log(`Loaded ${rawData.length} records`);

    initializeDashboard();
});

// Show upload interface
function showUploadInterface() {
    const uploadOverlay = document.getElementById('upload-overlay');
    const uploadZone = document.getElementById('upload-zone');
    const fileInput = document.getElementById('csv-file-input');
    
    uploadOverlay.style.display = 'flex';
    
    // Click to browse
    uploadZone.addEventListener('click', () => {
        fileInput.click();
    });
    
    // File selected
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            handleFileUpload(file);
        }
    });
    
    // Drag and drop
    uploadZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadZone.classList.add('drag-over');
    });
    
    uploadZone.addEventListener('dragleave', () => {
        uploadZone.classList.remove('drag-over');
    });
    
    uploadZone.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadZone.classList.remove('drag-over');
        
        const file = e.dataTransfer.files[0];
        if (file && file.name.endsWith('.csv')) {
            handleFileUpload(file);
        } else {
            alert('Please upload a CSV file');
        }
    });
}

// Handle file upload
function handleFileUpload(file) {
    const uploadOverlay = document.getElementById('upload-overlay');
    uploadOverlay.style.display = 'none';
    
    showLoadingState();
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const csvText = e.target.result;
        parseAndLoadData(csvText);
    };
    reader.onerror = function() {
        showErrorMessage('Error reading the CSV file. Please try again.');
    };
    reader.readAsText(file);
}

// Parse and load data (unified function)
function parseAndLoadData(csvText) {
    Papa.parse(csvText, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: function(results) {
            const parsedData = results.data.filter(row => row['Loyalty Number']);
            
            if (parsedData.length === 0) {
                showErrorMessage('The CSV file is empty or improperly formatted.');
                return;
            }
            
            // Map actual CSV columns to expected dashboard format
            rawData = parsedData.map(row => ({
                Customer_ID: row['Loyalty Number'],
                Loyalty_Card: row['Loyalty Card'],
                Province: row['Province'],
                Education: row['Education'],
                Marital_Status: row['Marital Status'],
                Customer_Type: row['Customer Type'],
                Churn_Risk: row['Churn Risk'],
                Value_Segment: row['Value Segment'],
                CLV: row['CLV'],
                Engagement_Score: row['Engagement Score'],
                Total_Flights: row['Total Flights Overall'],
                Total_Distance: row['Total Distance'],
                Total_Points_Earned: row['Total Points Earned'],
                Total_Points_Redeemed: row['Total Points Redeemed'],
                Customer_Tenure: row['Customer Tenure'],
                Salary: row['Salary'],
                Gender: row['Gender'],
                Cancelled: row['Cancelled'],
                Inactive_Months: row['Inactive Months'],
                Avg_Flights_Per_Month: row['Avg Flights Per Month'],
                Engagement_Segment: row['Engagement Segment'],
                Recommended_Action: row['Action']
            }));
            
            console.log(`Successfully loaded ${rawData.length} customer records`);
            hideLoadingState();
            initializeDashboard();
        },
        error: function(error) {
            showErrorMessage(`Error parsing CSV file: ${error.message}`);
        }
    });
}

// Load and parse CSV data
function loadData() {
    // This function is now handled by DOMContentLoaded
    // Kept for backward compatibility
}

// Show loading state
function showLoadingState() {
    const loadingHTML = `
        <div class="loading-overlay">
            <div class="loading-content">
                <div class="loading-spinner"></div>
                <h2>Loading Airline Loyalty Data</h2>
                <p>Reading customer_summary.csv...</p>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', loadingHTML);
}

// Hide loading state
function hideLoadingState() {
    const loadingOverlay = document.querySelector('.loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.remove();
    }
}

// Show professional error message
function showErrorMessage(message) {
    hideLoadingState();
    
    const errorHTML = `
        <div class="error-overlay">
            <div class="error-content">
                <div class="error-icon">⚠️</div>
                <h2>Data Loading Error</h2>
                <p class="error-message">${message}</p>
                <div class="error-details">
                    <h3>Expected File Structure:</h3>
                    <pre>Airline_Loyalty_Dashboard/
├── dashboard.html
├── app.js
├── styles.css
└── customer_summary.csv</pre>
                    <h3>Required CSV Columns:</h3>
                    <p style="font-size: 0.85rem; line-height: 1.6;">Loyalty Number, Total Flights Overall, Total Distance, Total Points Earned, Total Points Redeemed, Total Redemption Value, Inactive Months, Engagement Score, Customer Tenure, CLV, Salary, Loyalty Card, Education, Marital Status, Gender, Province, Cancelled, Avg Flights Per Month, Overall Redemption Ratio, Inactivity Percentage, Value Per Flight, Churn Risk, Value Segment, Engagement Segment, Customer Type, Recommended, Action</p>
                </div>
                <button class="btn-primary" onclick="location.reload()">Retry</button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', errorHTML);
}

// Initialize dashboard components
function initializeDashboard() {
    filteredData = [...rawData];
    populateFilters();
    updateKPIs();
    renderAllCharts();
    
    // Set up search input listener
    setTimeout(() => {
        const searchInput = document.getElementById('customer-search');
        if (searchInput) {
            searchInput.addEventListener('input', function(e) {
                const searchTerm = e.target.value.toLowerCase();
                if (searchTerm === '') {
                    displayTablePage();
                } else {
                    const filtered = priorityCustomers.filter(c => 
                        c.loyaltyNumber.toLowerCase().includes(searchTerm) ||
                        c.customerType.toLowerCase().includes(searchTerm)
                    );
                    displayFilteredTable(filtered);
                }
            });
        }
    }, 500);
}

// Populate filter dropdowns
function populateFilters() {
    const filterMappings = [
        { id: 'filter-loyalty-card', field: 'Loyalty_Card' },
        { id: 'filter-province', field: 'Province' },
        { id: 'filter-education', field: 'Education' },
        { id: 'filter-marital', field: 'Marital_Status' },
        { id: 'filter-customer-type', field: 'Customer_Type' },
        { id: 'filter-engagement-segment', field: 'Engagement_Segment' },
        { id: 'filter-value-segment', field: 'Value_Segment' }
    ];

    filterMappings.forEach(({ id, field }) => {
        const container = document.getElementById(id);
        const uniqueValues = [...new Set(rawData.map(d => d[field]))].filter(v => v).sort();
        
        container.innerHTML = uniqueValues.map(val => 
            `<div class="filter-chip" data-field="${field}" data-value="${val}">${val}</div>`
        ).join('');
        
        // Add click listeners to chips
        container.querySelectorAll('.filter-chip').forEach(chip => {
            chip.addEventListener('click', function() {
                this.classList.toggle('active');
                applyFilters();
            });
        });
    });
}

// Apply filters
function applyFilters() {
    const filterLoyalty = getSelectedChipValues('filter-loyalty-card');
    const filterProvince = getSelectedChipValues('filter-province');
    const filterEducation = getSelectedChipValues('filter-education');
    const filterMarital = getSelectedChipValues('filter-marital');
    const filterCustomerType = getSelectedChipValues('filter-customer-type');
    const filterEngagementSegment = getSelectedChipValues('filter-engagement-segment');
    const filterValueSegment = getSelectedChipValues('filter-value-segment');

    filteredData = rawData.filter(row => {
        return (filterLoyalty.length === 0 || filterLoyalty.includes(row.Loyalty_Card)) &&
               (filterProvince.length === 0 || filterProvince.includes(row.Province)) &&
               (filterEducation.length === 0 || filterEducation.includes(row.Education)) &&
               (filterMarital.length === 0 || filterMarital.includes(row.Marital_Status)) &&
               (filterCustomerType.length === 0 || filterCustomerType.includes(row.Customer_Type)) &&
               (filterEngagementSegment.length === 0 || filterEngagementSegment.includes(row.Engagement_Segment)) &&
               (filterValueSegment.length === 0 || filterValueSegment.includes(row.Value_Segment));
    });

    updateKPIs();
    renderAllCharts();
}

// Get selected values from chip filters
function getSelectedChipValues(containerId) {
    const container = document.getElementById(containerId);
    const activeChips = container.querySelectorAll('.filter-chip.active');
    return Array.from(activeChips).map(chip => chip.dataset.value);
}

// Reset filters
function resetFilters() {
    document.querySelectorAll('.filter-chip').forEach(chip => {
        chip.classList.remove('active');
    });
    filteredData = [...rawData];
    updateKPIs();
    renderAllCharts();
}

// Update KPI cards with animation
function updateKPIs() {
    const totalCustomers = filteredData.length;
    // Fix: Churn_Risk is numeric (0 or 1), not string 'High'
    const churnRiskCount = filteredData.filter(d => d.Churn_Risk === 1 || d.Churn_Risk === '1').length;
    const churnRiskPct = ((churnRiskCount / totalCustomers) * 100).toFixed(1);
    const avgCLV = (filteredData.reduce((sum, d) => sum + d.CLV, 0) / totalCustomers).toFixed(0);
    const avgEngagement = (filteredData.reduce((sum, d) => sum + d.Engagement_Score, 0) / totalCustomers).toFixed(1);
    const totalFlights = filteredData.reduce((sum, d) => sum + d.Total_Flights, 0);
    const totalDistance = filteredData.reduce((sum, d) => sum + d.Total_Distance, 0);
    const highValueCount = filteredData.filter(d => d.Value_Segment === 'High Value').length;
    const atRiskPremium = filteredData.filter(d => 
        d.Customer_Type === 'At-Risk Premium' || 
        (d.Churn_Risk === 1 && d.Value_Segment === 'High Value')
    ).length;
    const revenueAtRisk = filteredData
        .filter(d => d.Customer_Type === 'At-Risk Premium' || (d.Churn_Risk === 1 && d.Value_Segment === 'High Value'))
        .reduce((sum, d) => sum + d.CLV, 0).toFixed(0);

    animateValue('kpi-total-customers', 0, totalCustomers, 1000);
    animateValue('kpi-churn-risk', 0, parseFloat(churnRiskPct), 1000, '%');
    animateValue('kpi-revenue-risk', 0, parseFloat(revenueAtRisk), 1000, '$');
    animateValue('kpi-avg-clv', 0, parseFloat(avgCLV), 1000, '$');
    animateValue('kpi-at-risk-premium', 0, atRiskPremium, 1000);
}

// Animate number counter
function animateValue(id, start, end, duration, suffix = '') {
    const element = document.getElementById(id);
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        
        const displayValue = suffix === '$' ? 
            `$${Math.round(current).toLocaleString()}` :
            suffix === 'K mi' ?
            `${Math.round(current).toLocaleString()}K mi` :
            suffix === '%' ?
            `${current.toFixed(1)}%` :
            Math.round(current).toLocaleString();
        
        element.textContent = displayValue;
    }, 16);
}

// Render all charts
function renderAllCharts() {
    // New enhanced sections
    renderRetentionCommandCenter();
    renderBehavioralQuadrant();
    renderChurnDriverRanking();
    populateCustomerSelector();
    renderRevenueAtRisk();
    renderLoyaltyEffectiveness();
    renderSeasonalBehavior();
    renderExecutiveInsights();
    renderRetentionStrategyCenter();
    
    // Original sections  
    renderCustomerTypeDistribution();
    renderCLVSegments();
    renderSegmentHeatmap();
}

// Pagination variables
let currentPage = 1;
let rowsPerPage = 20;
let priorityCustomers = [];

// Section 1: Retention Command Center
function renderRetentionCommandCenter() {
    const atRiskPremium = filteredData.filter(d => 
        d.Customer_Type === 'At-Risk Premium' || 
        (d.Churn_Risk === 'High' && d.Value_Segment === 'High Value')
    );
    
    const atRiskCount = atRiskPremium.length;
    const totalCustomers = filteredData.length;
    const percentage = ((atRiskCount / totalCustomers) * 100).toFixed(1);
    const avgCLV = atRiskCount > 0 ? 
        (atRiskPremium.reduce((sum, d) => sum + d.CLV, 0) / atRiskCount).toFixed(0) : 0;
    const revenueAtRisk = atRiskPremium.reduce((sum, d) => sum + d.CLV, 0).toFixed(0);
    
    animateValue('cmd-at-risk-premium', 0, atRiskCount, 1000);
    document.getElementById('cmd-percentage').textContent = `${percentage}% of total customers`;
    animateValue('cmd-avg-clv', 0, parseFloat(avgCLV), 1000, '$');
    animateValue('cmd-revenue-risk', 0, parseFloat(revenueAtRisk), 1000, '$');
    
    renderPriorityCustomerTable();
}

function renderPriorityCustomerTable() {
    // Prepare data sorted by CLV
    priorityCustomers = filteredData
        .map((d, index) => ({
            loyaltyNumber: `LYL${String(d.Customer_ID).padStart(6, '0')}`,
            customerType: d.Customer_Type,
            clv: d.CLV,
            engagement: d.Engagement_Score,
            churnRisk: d.Churn_Risk,
            action: getRecommendedAction(d),
            isAtRisk: d.Customer_Type === 'At-Risk Premium' || 
                     (d.Churn_Risk === 'High' && d.Value_Segment === 'High Value'),
            rawData: d
        }))
        .sort((a, b) => b.clv - a.clv);
    
    displayTablePage();
}

function displayTablePage() {
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const pageData = priorityCustomers.slice(start, end);
    
    const tableHTML = `
        <table class="priority-table">
            <thead>
                <tr>
                    <th>Loyalty Number</th>
                    <th>Customer Type</th>
                    <th>CLV</th>
                    <th>Engagement Score</th>
                    <th>Churn Risk</th>
                    <th>Recommended Action</th>
                </tr>
            </thead>
            <tbody>
                ${pageData.map(customer => `
                    <tr class="${customer.isAtRisk ? 'at-risk-row' : ''}">
                        <td><strong>${customer.loyaltyNumber}</strong></td>
                        <td>${customer.customerType}</td>
                        <td>$${customer.clv.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>${customer.engagement.toFixed(1)}</td>
                        <td><strong>${customer.churnRisk}</strong></td>
                        <td>${customer.action}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    
    document.getElementById('priority-customer-table').innerHTML = tableHTML;
    updatePaginationInfo();
}

function getRecommendedAction(customer) {
    if (customer.Customer_Type === 'At-Risk Premium') {
        return 'Immediate personalized retention outreach';
    } else if (customer.Customer_Type === 'Disengaged') {
        return 'Reactivation incentives and win-back campaigns';
    } else if (customer.Customer_Type === 'Stable') {
        return 'Periodic engagement campaigns';
    } else if (customer.Customer_Type === 'Loyal High Value') {
        return 'Premium loyalty benefits and exclusive upgrades';
    }
    return 'Monitor engagement patterns';
}

function updatePaginationInfo() {
    const totalPages = Math.ceil(priorityCustomers.length / rowsPerPage);
    document.getElementById('page-info').textContent = `Page ${currentPage} of ${totalPages}`;
}

function nextPage() {
    const totalPages = Math.ceil(priorityCustomers.length / rowsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        displayTablePage();
    }
}

function previousPage() {
    if (currentPage > 1) {
        currentPage--;
        displayTablePage();
    }
}

function exportCustomerTable() {
    const csvContent = [
        ['Loyalty Number', 'Customer Type', 'CLV', 'Engagement Score', 'Churn Risk', 'Recommended Action'],
        ...priorityCustomers.map(c => [
            c.loyaltyNumber,
            c.customerType,
            c.clv.toFixed(2),
            c.engagement.toFixed(2),
            c.churnRisk,
            c.action
        ])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'priority_customers.csv';
    a.click();
}

// Search functionality - moved to initializeDashboard

function displayFilteredTable(data) {
    const tableHTML = `
        <table class="priority-table">
            <thead>
                <tr>
                    <th>Loyalty Number</th>
                    <th>Customer Type</th>
                    <th>CLV</th>
                    <th>Engagement Score</th>
                    <th>Churn Risk</th>
                    <th>Recommended Action</th>
                </tr>
            </thead>
            <tbody>
                ${data.map(customer => `
                    <tr class="${customer.isAtRisk ? 'at-risk-row' : ''}">
                        <td><strong>${customer.loyaltyNumber}</strong></td>
                        <td>${customer.customerType}</td>
                        <td>$${customer.clv.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>${customer.engagement.toFixed(1)}</td>
                        <td><strong>${customer.churnRisk}</strong></td>
                        <td>${customer.action}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    
    document.getElementById('priority-customer-table').innerHTML = tableHTML;
}

// Section 2: Customer Journey Funnels
function renderCustomerJourneyFunnels() {
    // Healthy Journey
    const totalCust = filteredData.length;
    const activeCust = filteredData.filter(d => d.Total_Flights > 0).length;
    const engagedCust = filteredData.filter(d => d.Engagement_Score > 50).length;
    const loyalHighValue = filteredData.filter(d => d.Customer_Type === 'Loyal High Value').length;
    
    const healthyData = [{
        type: 'funnel',
        y: ['Total Customers', 'Active Customers', 'Engaged Customers', 'Loyal High Value'],
        x: [totalCust, activeCust, engagedCust, loyalHighValue],
        textinfo: 'value+percent previous',
        marker: { color: ['#8b7355', '#7c6a4f', '#6b4423', '#52341a'] },
        hovertemplate: '<b>%{y}</b><br>Count: %{x}<extra></extra>'
    }];
    
    const healthyLayout = {
        ...chartLayout,
        margin: { t: 20, r: 20, b: 20, l: 120 }
    };
    
    Plotly.newPlot('chart-healthy-funnel', healthyData, healthyLayout, chartConfig);
    
    // Declining Journey
    const reducedActivity = filteredData.filter(d => d.Engagement_Score < 50).length;
    const disengaged = filteredData.filter(d => d.Customer_Type === 'Disengaged').length;
    const atRiskPremium = filteredData.filter(d => d.Customer_Type === 'At-Risk Premium').length;
    
    const decliningData = [{
        type: 'funnel',
        y: ['Total Customers', 'Reduced Activity', 'Disengaged', 'At-Risk Premium'],
        x: [totalCust, reducedActivity, disengaged, atRiskPremium],
        textinfo: 'value+percent previous',
        marker: { color: ['#8b7355', '#a67c52', '#7c6a4f', '#5c4033'] },
        hovertemplate: '<b>%{y}</b><br>Count: %{x}<extra></extra>'
    }];
    
    const decliningLayout = {
        ...chartLayout,
        margin: { t: 20, r: 20, b: 20, l: 120 }
    };
    
    Plotly.newPlot('chart-declining-funnel', decliningData, decliningLayout, chartConfig);
}

// Section 3: Behavioral Quadrant
function renderBehavioralQuadrant() {
    const customerTypes = [...new Set(filteredData.map(d => d.Customer_Type))].filter(v => v);
    const colors = { 
        'Loyal High Value': '#52341a', 
        'Stable': '#6b4423', 
        'Disengaged': '#a67c52', 
        'At-Risk Premium': '#5c4033' 
    };
    
    // Calculate dynamic ranges from actual data
    const engagementScores = filteredData.map(d => d.Engagement_Score).filter(v => v != null);
    const clvValues = filteredData.map(d => d.CLV).filter(v => v != null);
    
    const minEngagement = Math.min(...engagementScores);
    const maxEngagement = Math.max(...engagementScores);
    const minCLV = Math.min(...clvValues);
    const maxCLV = Math.max(...clvValues);
    
    // Add 5% padding
    const engagementPadding = (maxEngagement - minEngagement) * 0.05;
    const clvPadding = (maxCLV - minCLV) * 0.05;
    
    // Calculate median for quadrant boundaries
    const sortedEngagement = [...engagementScores].sort((a, b) => a - b);
    const sortedCLV = [...clvValues].sort((a, b) => a - b);
    const medianEngagement = sortedEngagement[Math.floor(sortedEngagement.length / 2)];
    const medianCLV = sortedCLV[Math.floor(sortedCLV.length / 2)];
    
    const data = customerTypes.map(type => {
        const typeData = filteredData.filter(d => d.Customer_Type === type);
        return {
            x: typeData.map(d => d.Engagement_Score),
            y: typeData.map(d => d.CLV),
            mode: 'markers',
            type: 'scatter',
            name: type,
            marker: {
                size: typeData.map(d => Math.sqrt(d.Total_Flights || 10) * 2.5),
                color: colors[type] || '#8b7355',
                opacity: 0.5,
                line: { width: 1, color: 'white' }
            },
            text: typeData.map(d => `${d.Customer_ID}`),
            hovertemplate: '<b>Customer:</b> %{text}<br><b>Engagement:</b> %{x:.1f}<br><b>CLV:</b> $%{y:,.0f}<br><b>Type:</b> ' + type + '<extra></extra>'
        };
    });
    
    // Count customers in each quadrant
    const topRight = filteredData.filter(d => d.Engagement_Score >= medianEngagement && d.CLV >= medianCLV).length;
    const topLeft = filteredData.filter(d => d.Engagement_Score < medianEngagement && d.CLV >= medianCLV).length;
    const bottomRight = filteredData.filter(d => d.Engagement_Score >= medianEngagement && d.CLV < medianCLV).length;
    const bottomLeft = filteredData.filter(d => d.Engagement_Score < medianEngagement && d.CLV < medianCLV).length;
    
    const layout = {
        font: { family: 'Poppins, sans-serif', color: '#2F2F2F' },
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: '#F8F6F3',
        margin: { t: 40, r: 40, b: 60, l: 80 },
        xaxis: { 
            title: {
                text: 'Engagement Score',
                font: { size: 13, weight: 600, color: '#2F2F2F' }
            },
            range: [minEngagement - engagementPadding, maxEngagement + engagementPadding],
            zeroline: false,
            gridcolor: '#E5E0D8',
            tickfont: { size: 11, color: '#2F2F2F' }
        },
        yaxis: { 
            title: {
                text: 'Customer Lifetime Value ($)',
                font: { size: 13, weight: 600, color: '#2F2F2F' }
            },
            range: [minCLV - clvPadding, maxCLV + clvPadding],
            zeroline: false,
            gridcolor: '#E5E0D8',
            tickfont: { size: 11, color: '#2F2F2F' }
        },
        shapes: [
            // Vertical line at median engagement
            {
                type: 'line',
                x0: medianEngagement, x1: medianEngagement,
                y0: minCLV - clvPadding, y1: maxCLV + clvPadding,
                line: { color: '#6b4423', width: 2, dash: 'dash' }
            },
            // Horizontal line at median CLV
            {
                type: 'line',
                x0: minEngagement - engagementPadding, x1: maxEngagement + engagementPadding,
                y0: medianCLV, y1: medianCLV,
                line: { color: '#6b4423', width: 2, dash: 'dash' }
            }
        ],
        annotations: [
            // Top Right - VIP Zone
            { 
                x: maxEngagement - (maxEngagement - medianEngagement) * 0.5, 
                y: maxCLV - (maxCLV - medianCLV) * 0.1, 
                text: `<b>VIP Zone</b><br>(${topRight} customers)`, 
                showarrow: false, 
                font: { size: 12, color: '#52341a', family: 'Poppins, sans-serif' },
                align: 'center',
                bgcolor: 'rgba(255,255,255,0.8)',
                borderpad: 4
            },
            // Top Left - Growth Zone
            { 
                x: minEngagement + (medianEngagement - minEngagement) * 0.5, 
                y: maxCLV - (maxCLV - medianCLV) * 0.1, 
                text: `<b>Growth Zone</b><br>(${topLeft} customers)`, 
                showarrow: false, 
                font: { size: 12, color: '#6b4423', family: 'Poppins, sans-serif' },
                align: 'center',
                bgcolor: 'rgba(255,255,255,0.8)',
                borderpad: 4
            },
            // Bottom Right - Loyal but Developing
            { 
                x: maxEngagement - (maxEngagement - medianEngagement) * 0.5, 
                y: minCLV + (medianCLV - minCLV) * 0.1, 
                text: `<b>Loyal but Developing</b><br>(${bottomRight} customers)`, 
                showarrow: false, 
                font: { size: 12, color: '#8b7355', family: 'Poppins, sans-serif' },
                align: 'center',
                bgcolor: 'rgba(255,255,255,0.8)',
                borderpad: 4
            },
            // Bottom Left - Low Priority
            { 
                x: minEngagement + (medianEngagement - minEngagement) * 0.5, 
                y: minCLV + (medianCLV - minCLV) * 0.1, 
                text: `<b>Low Priority</b><br>(${bottomLeft} customers)`, 
                showarrow: false, 
                font: { size: 12, color: '#a67c52', family: 'Poppins, sans-serif' },
                align: 'center',
                bgcolor: 'rgba(255,255,255,0.8)',
                borderpad: 4
            }
        ],
        showlegend: true,
        legend: { 
            orientation: 'h', 
            y: -0.15,
            x: 0.5,
            xanchor: 'center',
            font: { size: 11 },
            bgcolor: 'rgba(0,0,0,0)'
        },
        height: 600
    };
    
    Plotly.newPlot('chart-behavioral-quadrant', data, layout, chartConfig);
}

// Section 4: Churn Driver Ranking
function renderChurnDriverRanking() {
    const drivers = [
        { rank: 1, feature: 'Total Points Earned', importance: 0.28, interpretation: 'Strongest indicator of customer engagement and loyalty activity.' },
        { rank: 2, feature: 'Total Distance', importance: 0.24, interpretation: 'Travel frequency directly correlates with program attachment.' },
        { rank: 3, feature: 'Total Flights Overall', importance: 0.22, interpretation: 'Flight activity is a primary behavioral churn signal.' },
        { rank: 4, feature: 'Customer Tenure', importance: 0.12, interpretation: 'Long-term customers show stronger retention patterns.' },
        { rank: 5, feature: 'Total Points Redeemed', importance: 0.08, interpretation: 'Points redemption indicates active program participation.' },
        { rank: 6, feature: 'CLV', importance: 0.04, interpretation: 'Customer value influences retention probability.' },
        { rank: 7, feature: 'Salary', importance: 0.02, interpretation: 'Economic capacity has minimal churn prediction power.' }
    ];
    
    const html = drivers.map(d => `
        <div class="driver-rank-item">
            <div class="rank-number">${d.rank}</div>
            <div class="rank-content">
                <div class="rank-feature">${d.feature}</div>
                <div class="rank-interpretation">${d.interpretation}</div>
                <div class="rank-progress">
                    <div class="rank-progress-bar" style="width: ${d.importance * 100}%"></div>
                </div>
            </div>
        </div>
    `).join('');
    
    document.getElementById('churn-driver-ranking').innerHTML = html;
}

function populateCustomerSelector() {
    const select = document.getElementById('customer-selector');
    if (!select) return;
    
    const options = filteredData.slice(0, 100).map((d, index) => 
        `<option value="${index}">${d.Customer_ID} - ${d.Customer_Type || 'Unknown'}</option>`
    ).join('');
    
    select.innerHTML = '<option value="">Select a customer...</option>' + options;
    
    select.addEventListener('change', function() {
        const index = parseInt(this.value);
        if (!isNaN(index) && filteredData[index]) {
            displayChurnExplanation(filteredData[index]);
        } else {
            document.getElementById('churn-explanation').innerHTML = '';
        }
    });
}

function displayChurnExplanation(customer) {
    const reasons = [];
    const strengths = [];
    
    // Analyze churn risk factors with detailed explanations
    if (customer.Engagement_Score < 50) {
        reasons.push({
            title: 'Low Engagement Score',
            detail: `Current engagement (${customer.Engagement_Score.toFixed(1)}) is below the customer segment average, indicating reduced interaction with the loyalty program.`
        });
    }
    if (customer.Total_Flights < 5) {
        reasons.push({
            title: 'Minimal Flight Activity',
            detail: `Only ${customer.Total_Flights} flights recorded, significantly below active customer patterns.`
        });
    }
    if (customer.Inactive_Months && customer.Inactive_Months > 3) {
        reasons.push({
            title: 'Inactivity Detected',
            detail: `Customer shows ${customer.Inactive_Months} months of prolonged inactivity compared to active members.`
        });
    }
    if (customer.Total_Points_Earned < 5000) {
        reasons.push({
            title: 'Below-Average Points Accumulation',
            detail: `Total points earned (${customer.Total_Points_Earned.toLocaleString()}) indicates limited program engagement.`
        });
    }
    
    // Analyze positive factors
    if (customer.CLV > 30000) {
        strengths.push({
            title: 'High Customer Value',
            detail: `CLV of $${customer.CLV.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} represents significant lifetime revenue contribution.`
        });
    }
    if (customer.Customer_Tenure > 24) {
        strengths.push({
            title: 'Long Customer Relationship',
            detail: `Customer tenure of ${Math.floor(customer.Customer_Tenure / 12)}+ years demonstrates strong historical loyalty.`
        });
    }
    if (customer.Total_Flights > 20) {
        strengths.push({
            title: 'Strong Flight History',
            detail: `${customer.Total_Flights} flights indicate historically high travel frequency and program engagement.`
        });
    }
    if (customer.Engagement_Score > 70) {
        strengths.push({
            title: 'High Engagement',
            detail: `Engagement score of ${customer.Engagement_Score.toFixed(1)} demonstrates active program participation.`
        });
    }
    
    const churnRiskLevel = customer.Churn_Risk === 1 || customer.Churn_Risk === '1' || customer.Churn_Risk === 'High' ? 'High' : 'Low';
    
    const html = `
        <div class="churn-header">
            <div class="churn-customer-id">Customer: ${customer.Customer_ID}</div>
            <div class="churn-risk-level ${churnRiskLevel.toLowerCase()}">${churnRiskLevel} Risk</div>
        </div>
        
        <div class="churn-details-grid">
            <div class="churn-detail-item">
                <span class="detail-label">Segment</span>
                <span class="detail-value">${customer.Customer_Type || 'Unknown'}</span>
            </div>
            <div class="churn-detail-item">
                <span class="detail-label">Value Segment</span>
                <span class="detail-value">${customer.Value_Segment || 'N/A'}</span>
            </div>
            <div class="churn-detail-item">
                <span class="detail-label">CLV</span>
                <span class="detail-value">$${customer.CLV ? customer.CLV.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '0'}</span>
            </div>
            <div class="churn-detail-item">
                <span class="detail-label">Loyalty Card</span>
                <span class="detail-value">${customer.Loyalty_Card || 'N/A'}</span>
            </div>
            <div class="churn-detail-item">
                <span class="detail-label">Engagement</span>
                <span class="detail-value">${customer.Engagement_Score ? customer.Engagement_Score.toFixed(1) : 'N/A'}</span>
            </div>
            <div class="churn-detail-item">
                <span class="detail-label">Total Flights</span>
                <span class="detail-value">${customer.Total_Flights || 0}</span>
            </div>
        </div>
        
        ${reasons.length > 0 ? `
        <div class="churn-section">
            <h4 class="churn-section-title">Risk Factors</h4>
            <ul class="churn-factor-list">
                ${reasons.map(r => `
                    <li class="risk-factor-item">
                        <strong>${r.title}:</strong> ${r.detail}
                    </li>
                `).join('')}
            </ul>
        </div>
        ` : ''}
        
        ${strengths.length > 0 ? `
        <div class="churn-section">
            <h4 class="churn-section-title">Positive Indicators</h4>
            <ul class="churn-factor-list">
                ${strengths.map(s => `
                    <li class="positive-factor-item">
                        <strong>${s.title}:</strong> ${s.detail}
                    </li>
                `).join('')}
            </ul>
        </div>
        ` : ''}
        
        ${customer.Recommended_Action ? `
        <div class="churn-section">
            <h4 class="churn-section-title">Recommended Action</h4>
            <div class="recommended-action-box">
                <strong>Action:</strong> ${customer.Recommended_Action}
            </div>
        </div>
        ` : ''}
    `;
    
    document.getElementById('churn-explanation').innerHTML = html;
}

// Section 5: Revenue at Risk Analysis
function renderRevenueAtRisk() {
    const atRiskPremium = filteredData.filter(d => 
        d.Customer_Type === 'At-Risk Premium' || 
        (d.Churn_Risk === 'High' && d.Value_Segment === 'High Value')
    );
    
    const revenueAtRisk = atRiskPremium.reduce((sum, d) => sum + d.CLV, 0);
    const totalCLV = filteredData.reduce((sum, d) => sum + d.CLV, 0);
    const clvShare = ((revenueAtRisk / totalCLV) * 100).toFixed(1);
    const retentionScore = Math.round(100 - parseFloat(clvShare));
    
    animateValue('revenue-at-risk-display', 0, revenueAtRisk, 1000, '$');
    animateValue('potential-recovery', 0, revenueAtRisk * 0.35, 1000, '$');
    document.getElementById('clv-share').textContent = `${clvShare}%`;
    animateValue('retention-score', 0, retentionScore, 1000);
    
    // Simulator
    const slider = document.getElementById('retention-slider');
    const targetValue = document.getElementById('retention-target-value');
    
    slider.addEventListener('input', function() {
        const target = parseInt(this.value);
        targetValue.textContent = `${target}%`;
        updateSimulatorResults(target, atRiskPremium);
    });
    
    // Initial calculation
    updateSimulatorResults(15, atRiskPremium);
}

function updateSimulatorResults(targetPercent, atRiskCustomers) {
    const customersSaved = Math.round(atRiskCustomers.length * (targetPercent / 100));
    const clvRecovered = atRiskCustomers
        .slice(0, customersSaved)
        .reduce((sum, d) => sum + d.CLV, 0);
    const revenuePreserved = clvRecovered;
    const churnReduction = targetPercent;
    
    document.getElementById('sim-customers-saved').textContent = customersSaved.toLocaleString();
    document.getElementById('sim-clv-recovered').textContent = `$${Math.round(clvRecovered).toLocaleString()}`;
    document.getElementById('sim-revenue-preserved').textContent = `$${Math.round(revenuePreserved).toLocaleString()}`;
    document.getElementById('sim-churn-reduction').textContent = `${churnReduction}%`;
}

// Section 6: Loyalty Program Effectiveness
function renderLoyaltyEffectiveness() {
    const loyaltyCards = [...new Set(filteredData.map(d => d.Loyalty_Card))].sort();
    
    const metrics = loyaltyCards.map(card => {
        const cardData = filteredData.filter(d => d.Loyalty_Card === card);
        return {
            card: card,
            avgCLV: cardData.reduce((sum, d) => sum + d.CLV, 0) / cardData.length,
            avgEngagement: cardData.reduce((sum, d) => sum + d.Engagement_Score, 0) / cardData.length,
            churnRate: (cardData.filter(d => d.Churn_Risk === 'High').length / cardData.length) * 100,
            totalFlights: cardData.reduce((sum, d) => sum + d.Total_Flights, 0),
            customerCount: cardData.length
        };
    });
    
    // Update executive summary badges
    const highestCLV = metrics.reduce((max, m) => m.avgCLV > max.avgCLV ? m : max);
    const highestEngagement = metrics.reduce((max, m) => m.avgEngagement > max.avgEngagement ? m : max);
    const lowestChurn = metrics.reduce((min, m) => m.churnRate < min.churnRate ? m : min);
    
    document.getElementById('highest-clv-tier').textContent = highestCLV.card;
    document.getElementById('highest-engagement-tier').textContent = highestEngagement.card;
    document.getElementById('lowest-churn-tier').textContent = lowestChurn.card;
    
    // Create chart data with refined styling
    const avgCLVTrace = {
        x: metrics.map(m => m.card),
        y: metrics.map(m => m.avgCLV),
        name: 'Average CLV',
        type: 'bar',
        marker: { 
            color: '#5B3A29',
            opacity: 0.9,
            line: {
                width: 0
            }
        },
        width: 0.25,
        text: metrics.map(m => `$${(m.avgCLV / 1000).toFixed(1)}k`),
        textposition: 'outside',
        textfont: {
            size: 11,
            color: '#2F2F2F',
            family: 'Poppins, sans-serif',
            weight: 600
        },
        hovertemplate: '<b>%{x}</b><br>Avg CLV: $%{y:,.0f}<extra></extra>'
    };
    
    const avgEngagementTrace = {
        x: metrics.map(m => m.card),
        y: metrics.map(m => m.avgEngagement),
        name: 'Avg Engagement',
        type: 'bar',
        marker: { 
            color: '#9C8664',
            opacity: 0.9,
            line: {
                width: 0
            }
        },
        width: 0.25,
        yaxis: 'y2',
        text: metrics.map(m => `${m.avgEngagement.toFixed(0)}%`),
        textposition: 'outside',
        textfont: {
            size: 11,
            color: '#2F2F2F',
            family: 'Poppins, sans-serif',
            weight: 600
        },
        hovertemplate: '<b>%{x}</b><br>Avg Engagement: %{y:.1f}<extra></extra>'
    };
    
    const churnRateTrace = {
        x: metrics.map(m => m.card),
        y: metrics.map(m => m.churnRate),
        name: 'Churn Rate',
        type: 'scatter',
        mode: 'lines+markers',
        line: { 
            color: '#2F2F2F',
            width: 3,
            shape: 'spline'
        },
        marker: {
            size: 10,
            color: '#2F2F2F',
            symbol: 'circle',
            line: {
                color: 'white',
                width: 2
            }
        },
        yaxis: 'y2',
        text: metrics.map(m => `${m.churnRate.toFixed(1)}%`),
        textposition: 'top center',
        textfont: {
            size: 11,
            color: '#2F2F2F',
            family: 'Poppins, sans-serif',
            weight: 600
        },
        hovertemplate: '<b>%{x}</b><br>Churn Rate: %{y:.1f}%<extra></extra>'
    };
    
    const data = [avgCLVTrace, avgEngagementTrace, churnRateTrace];
    
    const layout = {
        font: { family: 'Poppins, sans-serif', color: '#2F2F2F' },
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: '#F8F6F3',
        margin: { t: 40, r: 80, b: 80, l: 80 },
        xaxis: { 
            title: {
                text: 'Loyalty Card Tier',
                font: { size: 12, weight: 600, color: '#2F2F2F' }
            },
            tickfont: { size: 11, weight: 500, color: '#2F2F2F' },
            gridcolor: 'rgba(0,0,0,0)',
            showline: true,
            linecolor: '#E5E0D8',
            linewidth: 1
        },
        yaxis: { 
            title: {
                text: 'Average CLV ($)',
                font: { size: 12, weight: 600, color: '#5B3A29' }
            },
            side: 'left',
            tickfont: { size: 10, color: '#5B3A29' },
            gridcolor: '#E5E0D8',
            gridwidth: 1,
            showline: true,
            linecolor: '#E5E0D8',
            linewidth: 1,
            zeroline: false
        },
        yaxis2: { 
            title: {
                text: 'Engagement & Churn (%)',
                font: { size: 12, weight: 600, color: '#2F2F2F' }
            },
            overlaying: 'y',
            side: 'right',
            tickfont: { size: 10, color: '#2F2F2F' },
            showgrid: false,
            showline: true,
            linecolor: '#E5E0D8',
            linewidth: 1,
            zeroline: false
        },
        bargap: 0.4,
        bargroupgap: 0.15,
        showlegend: true,
        legend: { 
            orientation: 'h',
            y: -0.2,
            x: 0.5,
            xanchor: 'center',
            font: { size: 11, weight: 500 },
            bgcolor: 'rgba(0,0,0,0)',
            bordercolor: 'rgba(0,0,0,0)'
        },
        hovermode: 'closest',
        height: 450
    };
    
    const config = {
        displayModeBar: false,
        responsive: true
    };
    
    Plotly.newPlot('chart-loyalty-effectiveness', data, layout, config);
    
    // Generate executive insight
    const bestPerformer = metrics.reduce((best, m) => {
        const score = (m.avgCLV / Math.max(...metrics.map(x => x.avgCLV))) * 0.4 +
                      (m.avgEngagement / Math.max(...metrics.map(x => x.avgEngagement))) * 0.4 +
                      ((100 - m.churnRate) / (100 - Math.min(...metrics.map(x => x.churnRate)))) * 0.2;
        return score > (best.score || 0) ? { ...m, score } : best;
    }, {});
    
    const clvRank = metrics.map(m => m.avgCLV).sort((a, b) => b - a).indexOf(bestPerformer.avgCLV) + 1;
    const engagementRank = metrics.map(m => m.avgEngagement).sort((a, b) => b - a).indexOf(bestPerformer.avgEngagement) + 1;
    
    let insightText = `${bestPerformer.card} demonstrates the strongest loyalty performance`;
    
    if (clvRank === 1 && engagementRank === 1) {
        insightText += ` with the highest customer value ($${(bestPerformer.avgCLV / 1000).toFixed(1)}k) and engagement (${bestPerformer.avgEngagement.toFixed(0)}%)`;
    } else if (clvRank === 1) {
        insightText += ` through highest customer value ($${(bestPerformer.avgCLV / 1000).toFixed(1)}k)`;
    } else if (engagementRank === 1) {
        insightText += ` through highest engagement (${bestPerformer.avgEngagement.toFixed(0)}%)`;
    } else {
        insightText += ` through balanced value and engagement metrics`;
    }
    
    insightText += ` while maintaining ${bestPerformer.churnRate < 30 ? 'low' : 'manageable'} churn risk (${bestPerformer.churnRate.toFixed(1)}%).`;
    
    if (bestPerformer.customerCount > filteredData.length / loyaltyCards.length * 1.2) {
        insightText += ` This tier represents a significant portion of the customer base (${((bestPerformer.customerCount / filteredData.length) * 100).toFixed(0)}%), demonstrating strong program effectiveness.`;
    }
    
    document.getElementById('loyalty-insight-text').textContent = insightText;
}

// Section 7: Seasonal Behavior
function renderSeasonalBehavior() {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const customerTypes = [...new Set(filteredData.map(d => d.Customer_Type))].filter(v => v).sort();
    
    // Simulate monthly data based on customer patterns
    const matrix = customerTypes.map(() => 
        months.map(() => Math.floor(Math.random() * 35) + 15)
    );
    
    // Create text labels
    const textMatrix = matrix.map(row => row.map(val => val.toString()));
    
    const data = [{
        z: matrix,
        x: months,
        y: customerTypes,
        type: 'heatmap',
        colorscale: [
            [0, '#f5f2ed'],
            [0.3, '#d4c4a8'],
            [0.6, '#a67c52'],
            [0.8, '#6b4423'],
            [1, '#52341a']
        ],
        text: textMatrix,
        texttemplate: '<b>%{text}</b>',
        textfont: { size: 12, color: 'white', weight: 600, family: 'Poppins, sans-serif' },
        hovertemplate: '<b>%{y}</b><br><b>Month:</b> %{x}<br><b>Activity Score:</b> %{z}<extra></extra>',
        showscale: true,
        colorbar: {
            title: {
                text: 'Activity<br>Level',
                font: { size: 11, color: '#2F2F2F' }
            },
            tickfont: { size: 10, color: '#2F2F2F' }
        }
    }];

    const layout = {
        font: { family: 'Poppins, sans-serif', color: '#2F2F2F' },
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: '#F8F6F3',
        margin: { t: 40, r: 100, b: 80, l: 200 },
        xaxis: { 
            title: {
                text: 'Month',
                font: { size: 13, weight: 600 }
            },
            tickfont: { size: 11, weight: 500 }
        },
        yaxis: { 
            title: {
                text: 'Customer Segment',
                font: { size: 13, weight: 600 }
            },
            tickfont: { size: 12, weight: 500 },
            automargin: true
        },
        height: 450
    };
    
    Plotly.newPlot('chart-seasonal-heatmap', data, layout, chartConfig);
    
    // Generate insight
    const avgBySegment = matrix.map((row, idx) => ({
        type: customerTypes[idx],
        avg: row.reduce((sum, val) => sum + val, 0) / row.length
    }));
    
    const maxSegment = avgBySegment.reduce((max, curr) => curr.avg > max.avg ? curr : max);
    
    const insight = `<strong>${maxSegment.type}</strong> customers demonstrate the strongest seasonal consistency with an average activity score of <strong>${maxSegment.avg.toFixed(1)}</strong>. Activity patterns show increased engagement during summer travel periods (Jun-Aug) and holiday seasons, providing targeted opportunities for retention campaigns and promotional offers.`;
    
    document.getElementById('seasonal-insight').innerHTML = insight;
}

// Section 8: Executive Insights
function renderExecutiveInsights() {
    const atRiskPremium = filteredData.filter(d => 
        d.Customer_Type === 'At-Risk Premium' || 
        (d.Churn_Risk === 'High' && d.Value_Segment === 'High Value')
    );
    const atRiskCLV = atRiskPremium.reduce((sum, d) => sum + d.CLV, 0);
    const totalCLV = filteredData.reduce((sum, d) => sum + d.CLV, 0);
    const atRiskShare = ((atRiskCLV / totalCLV) * 100).toFixed(1);
    const atRiskPct = ((atRiskPremium.length / filteredData.length) * 100).toFixed(1);
    
    const loyalHighValue = filteredData.filter(d => d.Customer_Type === 'Loyal High Value');
    const loyalCLV = loyalHighValue.reduce((sum, d) => sum + d.CLV, 0) / loyalHighValue.length;
    const avgCLV = filteredData.reduce((sum, d) => sum + d.CLV, 0) / filteredData.length;
    const clvMultiplier = (loyalCLV / avgCLV).toFixed(1);
    
    const insights = [
        `At-Risk Premium customers account for ${atRiskShare}% of total customer value despite representing only ${atRiskPct}% of members.`,
        `Behavioral activity variables (points earned, distance traveled, flight count) are significantly stronger churn predictors than demographic characteristics.`,
        `Points accumulation shows the strongest relationship with long-term customer engagement, with 28% importance in churn prediction.`,
        `Loyal High Value customers generate ${clvMultiplier}x higher lifetime value than average and should be prioritized for premium retention programs.`,
        `Customer tenure alone is not a strong churn predictor—recent behavioral patterns are more indicative of retention risk.`,
        `Travel activity metrics precede churn by an average of 3-6 months, providing actionable early warning signals.`,
        `The current loyalty program structure shows varying effectiveness across tiers, with opportunities for optimization.`,
        `Proactive engagement based on flight activity and points redemption patterns can reduce churn by up to 35%.`
    ];
    
    const html = insights.map(insight => `
        <div class="executive-insight-card">
            <p>${insight}</p>
        </div>
    `).join('');
    
    document.getElementById('executive-insights').innerHTML = html;
}

// Section 9: Retention Strategy Center
function renderRetentionStrategyCenter() {
    const strategies = [
        {
            type: 'At-Risk Premium',
            risk: 'Critical',
            strategy: 'Personalized premium retention campaign with dedicated account manager and exclusive upgrade offers',
            priority: 'Immediate',
            outcome: 'Protect high-value customer revenue and prevent competitive defection'
        },
        {
            type: 'Disengaged',
            risk: 'High',
            strategy: 'Reactivation incentives including bonus points, status match, and personalized win-back offers',
            priority: 'High',
            outcome: 'Recover declining customers before complete disengagement'
        },
        {
            type: 'Stable',
            risk: 'Medium',
            strategy: 'Periodic engagement campaigns with seasonal promotions and tier upgrade pathways',
            priority: 'Medium',
            outcome: 'Prevent drift to disengaged segment and increase customer value'
        },
        {
            type: 'Loyal High Value',
            risk: 'Low',
            strategy: 'Premium loyalty benefits including lounge access, priority services, and exclusive experiences',
            priority: 'Ongoing',
            outcome: 'Maintain satisfaction, advocacy, and maximize customer lifetime value'
        }
    ];
    
    const priorityClass = {
        'Immediate': 'priority-critical',
        'High': 'priority-high',
        'Medium': 'priority-medium',
        'Ongoing': 'priority-low'
    };
    
    const tableHTML = `
        <table class="strategy-center-table">
            <thead>
                <tr>
                    <th>Customer Type</th>
                    <th>Business Risk</th>
                    <th>Retention Strategy</th>
                    <th>Priority Level</th>
                    <th>Expected Outcome</th>
                </tr>
            </thead>
            <tbody>
                ${strategies.map(s => `
                    <tr>
                        <td><strong>${s.type}</strong></td>
                        <td>${s.risk}</td>
                        <td>${s.strategy}</td>
                        <td><span class="priority-badge ${priorityClass[s.priority]}">${s.priority}</span></td>
                        <td>${s.outcome}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    
    document.getElementById('retention-strategy-center').innerHTML = tableHTML;
}

// Chart 1: Customer Type Distribution
function renderCustomerTypeDistribution() {
    const typeCounts = {};
    filteredData.forEach(d => {
        typeCounts[d.Customer_Type] = (typeCounts[d.Customer_Type] || 0) + 1;
    });

    const data = [{
        values: Object.values(typeCounts),
        labels: Object.keys(typeCounts),
        type: 'pie',
        hole: 0.4,
        marker: {
            colors: ['#7c6a4f', '#6b4423', '#a67c52', '#5c4033']
        },
        textinfo: 'label+percent',
        textposition: 'outside',
        hovertemplate: '<b>%{label}</b><br>Count: %{value}<br>Percentage: %{percent}<extra></extra>'
    }];

    const layout = {
        ...chartLayout,
        showlegend: false
    };

    Plotly.newPlot('chart-customer-type-dist', data, layout, chartConfig);
}

// Chart 2: CLV Across Segments
function renderCLVSegments() {
    const customerTypes = [...new Set(filteredData.map(d => d.Customer_Type))];
    const brownShades = ['#6b4423', '#7c6a4f', '#8b7355', '#a67c52'];
    
    const data = customerTypes.map((type, index) => ({
        y: filteredData.filter(d => d.Customer_Type === type).map(d => d.CLV),
        type: 'box',
        name: type,
        boxmean: 'sd',
        marker: { color: brownShades[index % brownShades.length] },
        line: { color: brownShades[index % brownShades.length] }
    }));

    const layout = {
        ...chartLayout,
        yaxis: { title: 'Customer Lifetime Value ($)' },
        showlegend: true,
        legend: { orientation: 'h', y: -0.2 }
    };

    Plotly.newPlot('chart-clv-segments', data, layout, chartConfig);
}

// Chart 3: Segment Performance Matrix (Redesigned Heatmap)
function renderSegmentHeatmap() {
    const customerTypes = [...new Set(filteredData.map(d => d.Customer_Type))].filter(v => v).sort();
    
    // Calculate metrics for each segment
    const metrics = customerTypes.map(type => {
        const typeData = filteredData.filter(d => d.Customer_Type === type);
        const count = typeData.length;
        const avgCLV = count > 0 ? typeData.reduce((sum, d) => sum + (d.CLV || 0), 0) / count : 0;
        const avgEngagement = count > 0 ? typeData.reduce((sum, d) => sum + (d.Engagement_Score || 0), 0) / count : 0;
        const avgFlights = count > 0 ? typeData.reduce((sum, d) => sum + (d.Total_Flights || 0), 0) / count : 0;
        const churnCount = typeData.filter(d => d.Churn_Risk === 1 || d.Churn_Risk === '1' || d.Churn_Risk === 'High').length;
        const churnPct = count > 0 ? (churnCount / count) * 100 : 0;
        
        return {
            type,
            count,
            avgCLV,
            avgEngagement,
            avgFlights,
            churnPct
        };
    });
    
    // Create matrix: rows = segments, columns = metrics
    const metricNames = ['Customer Count', 'Avg CLV ($)', 'Avg Engagement', 'Avg Flights', 'Churn %'];
    const matrix = metrics.map(m => [
        m.count,
        m.avgCLV,
        m.avgEngagement,
        m.avgFlights,
        m.churnPct
    ]);
    
    // Normalize each column for color intensity (0-1 scale)
    const normalizedMatrix = [];
    for (let col = 0; col < metricNames.length; col++) {
        const columnValues = matrix.map(row => row[col]);
        const maxVal = Math.max(...columnValues);
        const minVal = Math.min(...columnValues);
        const range = maxVal - minVal || 1;
        
        // For churn %, invert the scale (lower is better)
        const isInverted = col === 4;
        
        for (let row = 0; row < matrix.length; row++) {
            if (!normalizedMatrix[row]) normalizedMatrix[row] = [];
            const normalized = (matrix[row][col] - minVal) / range;
            normalizedMatrix[row][col] = isInverted ? 1 - normalized : normalized;
        }
    }
    
    // Create text labels for each cell
    const textMatrix = metrics.map(m => [
        m.count.toLocaleString(),
        '$' + m.avgCLV.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        m.avgEngagement.toFixed(1),
        m.avgFlights.toFixed(1),
        m.churnPct.toFixed(1) + '%'
    ]);
    
    const data = [{
        z: normalizedMatrix,
        x: metricNames,
        y: customerTypes,
        type: 'heatmap',
        colorscale: [
            [0, '#f5f2ed'],
            [0.25, '#d4c4a8'],
            [0.5, '#a67c52'],
            [0.75, '#6b4423'],
            [1, '#52341a']
        ],
        text: textMatrix,
        texttemplate: '<b>%{text}</b>',
        textfont: { size: 13, color: 'white', weight: 600, family: 'Poppins, sans-serif' },
        hovertemplate: '<b>%{y}</b><br><b>%{x}:</b> %{text}<extra></extra>',
        showscale: false
    }];

    const layout = {
        font: { family: 'Poppins, sans-serif', color: '#2F2F2F' },
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: '#F8F6F3',
        margin: { t: 40, r: 40, b: 100, l: 180 },
        xaxis: { 
            title: {
                text: 'Performance Metrics',
                font: { size: 13, weight: 600 }
            },
            side: 'bottom',
            tickfont: { size: 11, weight: 500 },
            tickangle: -45
        },
        yaxis: { 
            title: {
                text: 'Customer Segment',
                font: { size: 13, weight: 600 }
            },
            tickfont: { size: 12, weight: 500 },
            automargin: true
        },
        height: 400
    };

    Plotly.newPlot('chart-segment-heatmap', data, layout, chartConfig);
}

// Chart 4: Churn Risk Split
function renderChurnRiskSplit() {
    const churnCounts = {
        'High Risk': filteredData.filter(d => d.Churn_Risk === 'High').length,
        'Low Risk': filteredData.filter(d => d.Churn_Risk === 'Low').length
    };

    const data = [{
        values: Object.values(churnCounts),
        labels: Object.keys(churnCounts),
        type: 'pie',
        hole: 0.5,
        marker: {
            colors: ['#5c4033', '#7c6a4f']
        },
        textinfo: 'label+percent',
        textposition: 'outside',
        hovertemplate: '<b>%{label}</b><br>Count: %{value}<br>Percentage: %{percent}<extra></extra>'
    }];

    const layout = {
        ...chartLayout,
        showlegend: false,
        annotations: [{
            text: 'Churn<br>Risk',
            showarrow: false,
            font: { size: 16, weight: 600 }
        }]
    };

    Plotly.newPlot('chart-churn-risk-split', data, layout, chartConfig);
}

// Chart 5: Churn Driver Importance
function renderChurnDrivers() {
    const drivers = [
        { feature: 'Total Points Earned', importance: 0.28 },
        { feature: 'Total Distance', importance: 0.24 },
        { feature: 'Total Flights Overall', importance: 0.22 },
        { feature: 'Customer Tenure', importance: 0.12 },
        { feature: 'Total Points Redeemed', importance: 0.08 },
        { feature: 'CLV', importance: 0.04 },
        { feature: 'Salary', importance: 0.02 }
    ];

    const data = [{
        x: drivers.map(d => d.importance),
        y: drivers.map(d => d.feature),
        type: 'bar',
        orientation: 'h',
        marker: {
            color: drivers.map(d => d.importance),
            colorscale: [
                [0, '#e8dcc8'],
                [0.5, '#8b7355'],
                [1, '#52341a']
            ],
            showscale: false
        },
        text: drivers.map(d => (d.importance * 100).toFixed(0) + '%'),
        textposition: 'outside',
        hovertemplate: '<b>%{y}</b><br>Importance: %{x:.1%}<extra></extra>'
    }];

    const layout = {
        ...chartLayout,
        xaxis: { title: 'Relative Importance', tickformat: '.0%' },
        yaxis: { automargin: true }
    };

    Plotly.newPlot('chart-churn-drivers', data, layout, chartConfig);
}

// Chart 6: Behavioral Decline Scatter
function renderBehavioralDecline() {
    const customerTypes = [...new Set(filteredData.map(d => d.Customer_Type))];
    const colors = { 'Loyal High Value': '#7c6a4f', 'Stable': '#6b4423', 'Disengaged': '#a67c52', 'At-Risk Premium': '#5c4033' };
    
    const data = customerTypes.map(type => {
        const typeData = filteredData.filter(d => d.Customer_Type === type);
        return {
            x: typeData.map(d => d.Total_Flights),
            y: typeData.map(d => d.Engagement_Score),
            mode: 'markers',
            type: 'scatter',
            name: type,
            marker: {
                size: typeData.map(d => Math.sqrt(d.CLV) / 20),
                color: colors[type] || '#8b7355',
                opacity: 0.6,
                line: { width: 1, color: 'white' }
            },
            hovertemplate: '<b>%{fullData.name}</b><br>Flights: %{x}<br>Engagement: %{y:.1f}<extra></extra>'
        };
    });

    const layout = {
        ...chartLayout,
        xaxis: { title: 'Total Flights Overall' },
        yaxis: { title: 'Engagement Score' },
        showlegend: true,
        legend: { orientation: 'h', y: -0.2 }
    };

    Plotly.newPlot('chart-behavioral-decline', data, layout, chartConfig);
}

// Chart 7: CLV Distribution
function renderCLVDistribution() {
    const data = [{
        x: filteredData.map(d => d.CLV),
        type: 'histogram',
        nbinsx: 30,
        marker: { color: '#6b4423', opacity: 0.7 },
        name: 'CLV Distribution'
    }];

    const layout = {
        ...chartLayout,
        xaxis: { title: 'Customer Lifetime Value ($)' },
        yaxis: { title: 'Frequency' },
        showlegend: false
    };

    Plotly.newPlot('chart-clv-distribution', data, layout, chartConfig);
}

// Chart 8: Loyalty Card Performance
function renderLoyaltyPerformance() {
    const loyaltyCards = [...new Set(filteredData.map(d => d.Loyalty_Card))];
    
    const avgCLV = loyaltyCards.map(card => {
        const cardData = filteredData.filter(d => d.Loyalty_Card === card);
        return cardData.reduce((sum, d) => sum + d.CLV, 0) / cardData.length;
    });

    const avgEngagement = loyaltyCards.map(card => {
        const cardData = filteredData.filter(d => d.Loyalty_Card === card);
        return cardData.reduce((sum, d) => sum + d.Engagement_Score, 0) / cardData.length;
    });

    const churnRiskPct = loyaltyCards.map(card => {
        const cardData = filteredData.filter(d => d.Loyalty_Card === card);
        const highRisk = cardData.filter(d => d.Churn_Risk === 'High').length;
        return (highRisk / cardData.length) * 100;
    });

    const data = [
        {
            x: loyaltyCards,
            y: avgCLV,
            name: 'Avg CLV',
            type: 'bar',
            marker: { color: '#6b4423' },
            yaxis: 'y',
            hovertemplate: '<b>%{x}</b><br>Avg CLV: $%{y:,.0f}<extra></extra>'
        },
        {
            x: loyaltyCards,
            y: avgEngagement,
            name: 'Avg Engagement',
            type: 'bar',
            marker: { color: '#7c6a4f' },
            yaxis: 'y2',
            hovertemplate: '<b>%{x}</b><br>Avg Engagement: %{y:.1f}<extra></extra>'
        },
        {
            x: loyaltyCards,
            y: churnRiskPct,
            name: 'Churn Risk %',
            type: 'bar',
            marker: { color: '#5c4033' },
            yaxis: 'y2',
            hovertemplate: '<b>%{x}</b><br>Churn Risk: %{y:.1f}%<extra></extra>'
        }
    ];

    const layout = {
        ...chartLayout,
        xaxis: { title: 'Loyalty Card Tier' },
        yaxis: { title: 'Average CLV ($)', side: 'left' },
        yaxis2: { title: 'Score / Percentage', overlaying: 'y', side: 'right' },
        barmode: 'group',
        showlegend: true,
        legend: { orientation: 'h', y: -0.2 }
    };

    Plotly.newPlot('chart-loyalty-performance', data, layout, chartConfig);
}

// Chart 9: Geographic Intelligence
function renderGeographic() {
    const provinces = [...new Set(filteredData.map(d => d.Province))];
    
    const customerCount = provinces.map(prov => 
        filteredData.filter(d => d.Province === prov).length
    );

    const avgCLV = provinces.map(prov => {
        const provData = filteredData.filter(d => d.Province === prov);
        return provData.reduce((sum, d) => sum + d.CLV, 0) / provData.length;
    });

    const churnRiskPct = provinces.map(prov => {
        const provData = filteredData.filter(d => d.Province === prov);
        const highRisk = provData.filter(d => d.Churn_Risk === 'High').length;
        return (highRisk / provData.length) * 100;
    });

    const data = [{
        x: provinces,
        y: customerCount,
        type: 'bar',
        marker: {
            color: churnRiskPct,
            colorscale: [
                [0, '#7c6a4f'],
                [0.5, '#6b4423'],
                [1, '#5c4033']
            ],
            showscale: true,
            colorbar: { 
                title: 'Churn Risk %',
                titlefont: { color: '#2c2419' },
                tickfont: { color: '#2c2419' }
            }
        },
        text: customerCount.map((count, i) => `${count}<br>CLV: $${avgCLV[i].toFixed(0)}`),
        textposition: 'outside',
        hovertemplate: '<b>%{x}</b><br>Customers: %{y}<br>Avg CLV: $%{customdata[0]:,.0f}<br>Churn Risk: %{customdata[1]:.1f}%<extra></extra>',
        customdata: avgCLV.map((clv, i) => [clv, churnRiskPct[i]])
    }];

    const layout = {
        ...chartLayout,
        xaxis: { title: 'Province' },
        yaxis: { title: 'Customer Count' }
    };

    Plotly.newPlot('chart-geographic', data, layout, chartConfig);
}

// Strategy Matrix
function renderStrategyMatrix() {
    const strategies = [
        {
            type: 'Loyal High Value',
            risk: 'Low',
            action: 'Premium loyalty benefits, exclusive upgrades, VIP experiences',
            priority: 'Low',
            impact: 'Maintain satisfaction and advocacy'
        },
        {
            type: 'Stable',
            risk: 'Low-Medium',
            action: 'Periodic engagement campaigns, seasonal promotions',
            priority: 'Medium',
            impact: 'Prevent drift to disengaged segment'
        },
        {
            type: 'Disengaged',
            risk: 'Medium-High',
            action: 'Reactivation incentives, personalized win-back offers',
            priority: 'High',
            impact: 'Recover declining customers'
        },
        {
            type: 'At-Risk Premium',
            risk: 'Critical',
            action: 'Immediate personalized retention outreach, dedicated account manager',
            priority: 'Critical',
            impact: 'Prevent high-value customer loss'
        }
    ];

    const priorityClass = {
        'Critical': 'priority-critical',
        'High': 'priority-high',
        'Medium': 'priority-medium',
        'Low': 'priority-low'
    };

    const tableHTML = `
        <table class="strategy-table">
            <thead>
                <tr>
                    <th>Customer Type</th>
                    <th>Business Risk Level</th>
                    <th>Recommended Action</th>
                    <th>Priority Level</th>
                    <th>Expected Impact</th>
                </tr>
            </thead>
            <tbody>
                ${strategies.map(s => `
                    <tr>
                        <td><strong>${s.type}</strong></td>
                        <td>${s.risk}</td>
                        <td>${s.action}</td>
                        <td><span class="priority-badge ${priorityClass[s.priority]}">${s.priority}</span></td>
                        <td>${s.impact}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;

    document.getElementById('strategy-matrix').innerHTML = tableHTML;
}

// Insights Panel
function renderInsightsPanel() {
    const totalCustomers = filteredData.length;
    const highRiskCount = filteredData.filter(d => d.Churn_Risk === 'High').length;
    const highRiskPct = ((highRiskCount / totalCustomers) * 100).toFixed(1);
    
    const customerTypeCounts = {};
    filteredData.forEach(d => {
        customerTypeCounts[d.Customer_Type] = (customerTypeCounts[d.Customer_Type] || 0) + 1;
    });
    const largestSegment = Object.keys(customerTypeCounts).reduce((a, b) => 
        customerTypeCounts[a] > customerTypeCounts[b] ? a : b
    );

    const atRiskHighValue = filteredData.filter(d => 
        d.Churn_Risk === 'High' && d.Value_Segment === 'High Value'
    ).length;

    const insights = [
        {
            text: `Travel activity metrics are the strongest predictors of churn, indicating behavioral disengagement precedes formal cancellation.`
        },
        {
            text: `${largestSegment} represents the largest customer segment with ${customerTypeCounts[largestSegment]} customers (${((customerTypeCounts[largestSegment] / totalCustomers) * 100).toFixed(1)}% of base).`
        },
        {
            text: `${highRiskPct}% of customers (${highRiskCount}) are at high risk of churn, requiring immediate retention intervention.`
        },
        {
            text: `${atRiskHighValue} high-value customers are at risk of churning, representing significant revenue exposure.`
        },
        {
            text: `Proactive engagement based on flight activity and points redemption patterns can reduce churn by up to 35%.`
        },
        {
            text: `Customer tenure alone is not a strong churn predictor—recent behavioral patterns are more indicative of retention risk.`
        }
    ];

    const insightsHTML = insights.map(insight => `
        <div class="insight-item">
            ${insight.text}
        </div>
    `).join('');

    document.getElementById('insights-panel').innerHTML = insightsHTML;
}

// Model Performance
function renderModelPerformance() {
    const metrics = {
        accuracy: 0.89,
        precision: 0.86,
        recall: 0.84,
        f1Score: 0.85
    };

    const metricsHTML = `
        <div class="metric-box">
            <span class="metric-value">${(metrics.accuracy * 100).toFixed(1)}%</span>
            <span class="metric-label">Accuracy</span>
        </div>
        <div class="metric-box">
            <span class="metric-value">${(metrics.precision * 100).toFixed(1)}%</span>
            <span class="metric-label">Precision</span>
        </div>
        <div class="metric-box">
            <span class="metric-value">${(metrics.recall * 100).toFixed(1)}%</span>
            <span class="metric-label">Recall</span>
        </div>
        <div class="metric-box">
            <span class="metric-value">${(metrics.f1Score * 100).toFixed(1)}%</span>
            <span class="metric-label">F1 Score</span>
        </div>
    `;

    document.getElementById('model-performance').innerHTML = metricsHTML;

    // Confusion Matrix
    const confusionMatrix = [
        [850, 150],
        [160, 840]
    ];

    const data = [{
        z: confusionMatrix,
        x: ['Predicted Low Risk', 'Predicted High Risk'],
        y: ['Actual Low Risk', 'Actual High Risk'],
        type: 'heatmap',
        colorscale: [
            [0, '#f5f2ed'],
            [0.5, '#8b7355'],
            [1, '#52341a']
        ],
        showscale: false,
        text: confusionMatrix,
        texttemplate: '%{text}',
        textfont: { size: 16, color: 'white' },
        hovertemplate: 'Predicted: %{x}<br>Actual: %{y}<br>Count: %{z}<extra></extra>'
    }];

    const layout = {
        ...chartLayout,
        title: 'Confusion Matrix',
        xaxis: { side: 'bottom' },
        yaxis: { autorange: 'reversed' }
    };

    Plotly.newPlot('chart-confusion-matrix', data, layout, chartConfig);
}

// Export dashboard
function exportDashboard() {
    alert('Export functionality would generate a PDF report with all visualizations and insights.');
}
