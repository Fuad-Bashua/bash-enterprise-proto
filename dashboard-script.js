// ===================================
// Navigation & Page Switching
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initMobileMenu();
    initSidebarToggle();
    initNotifications();
    initQuickActions();
});

// Navigation between pages
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const pageContents = document.querySelectorAll('.page-content');
    const pageTitle = document.getElementById('pageTitle');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the target page
            const targetPage = this.getAttribute('data-page');
            
            // Remove active class from all nav items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Hide all page contents
            pageContents.forEach(content => content.classList.remove('active'));
            
            // Show target page content
            const targetContent = document.getElementById(`${targetPage}-content`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
            
            // Update page title
            const titleText = this.querySelector('.nav-text').textContent;
            pageTitle.textContent = titleText;
            
            // Close mobile menu if open
            const sidebar = document.getElementById('sidebar');
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('open');
            }
            
            // Save current page to localStorage
            localStorage.setItem('currentPage', targetPage);
        });
    });
    
    // Restore last visited page on load
    const savedPage = localStorage.getItem('currentPage');
    if (savedPage) {
        const savedNavItem = document.querySelector(`[data-page="${savedPage}"]`);
        if (savedNavItem) {
            savedNavItem.click();
        }
    }
}

// ===================================
// Mobile Menu Toggle
// ===================================

function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.querySelector('.main-content');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('open');
            this.classList.toggle('active');
            
            // Toggle hamburger animation
            this.classList.toggle('open');
        });
    }
    
    // Close sidebar when clicking outside on mobile
    mainContent.addEventListener('click', function() {
        if (window.innerWidth <= 768 && sidebar.classList.contains('open')) {
            sidebar.classList.remove('open');
            mobileMenuToggle.classList.remove('active');
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            sidebar.classList.remove('open');
            if (mobileMenuToggle) {
                mobileMenuToggle.classList.remove('active');
            }
        }
    });
}

// ===================================
// Sidebar Collapse Toggle (Desktop)
// ===================================

function initSidebarToggle() {
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            if (window.innerWidth > 768) {
                sidebar.classList.toggle('collapsed');
                
                // Save collapsed state
                const isCollapsed = sidebar.classList.contains('collapsed');
                localStorage.setItem('sidebarCollapsed', isCollapsed);
            }
        });
    }
    
    // Restore collapsed state
    const savedCollapsedState = localStorage.getItem('sidebarCollapsed');
    if (savedCollapsedState === 'true' && window.innerWidth > 768) {
        sidebar.classList.add('collapsed');
    }
}

// ===================================
// Notifications
// ===================================

function initNotifications() {
    const notificationBtn = document.querySelector('.icon-btn[title="Notifications"]');
    
    if (notificationBtn) {
        notificationBtn.addEventListener('click', function() {
            showNotificationsPanel();
        });
    }
}

function showNotificationsPanel() {
    // This would open a notifications dropdown
    console.log('Notifications panel opened');
    
    // Example notification data
    const notifications = [
        {
            type: 'success',
            message: 'Campaign completed successfully',
            time: '5 mins ago'
        },
        {
            type: 'info',
            message: 'New lead added to pipeline',
            time: '15 mins ago'
        },
        {
            type: 'warning',
            message: 'API rate limit approaching',
            time: '1 hour ago'
        }
    ];
    
    // You would create a dropdown panel here
    // For now, just logging to console
    notifications.forEach(notif => {
        console.log(`[${notif.type}] ${notif.message} - ${notif.time}`);
    });
}

// ===================================
// Quick Actions
// ===================================

function initQuickActions() {
    const actionButtons = document.querySelectorAll('.action-btn');
    
    actionButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.querySelector('span').textContent;
            handleQuickAction(action);
        });
    });
}

function handleQuickAction(action) {
    console.log(`Quick action clicked: ${action}`);
    
    // Route to appropriate page based on action
    switch(action) {
        case 'Generate Content':
            navigateToPage('content-creator');
            break;
        case 'Start Outreach':
            navigateToPage('outreach');
            break;
        case 'Review Leads':
            navigateToPage('leads');
            break;
        case 'View Reports':
            navigateToPage('analytics');
            break;
        default:
            console.log('Unknown action');
    }
}

function navigateToPage(pageName) {
    const navItem = document.querySelector(`[data-page="${pageName}"]`);
    if (navItem) {
        navItem.click();
    }
}

// ===================================
// Activity Feed Auto-Update
// ===================================

function updateActivityFeed() {
    // Simulate new activity
    const activityFeed = document.querySelector('.activity-feed');
    
    if (!activityFeed) return;
    
    // This would fetch real data from your backend
    // For demo purposes, we'll just log
    console.log('Activity feed updated');
}

// Update activity feed every 30 seconds
setInterval(updateActivityFeed, 30000);

// ===================================
// Stats Counter Animation
// ===================================

function animateStats() {
    const statValues = document.querySelectorAll('.stat-value');
    
    statValues.forEach(stat => {
        const finalValue = stat.textContent;
        
        // Only animate numbers
        if (!isNaN(parseInt(finalValue))) {
            const target = parseInt(finalValue);
            animateValue(stat, 0, target, 1500);
        }
    });
}

function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = Math.floor(progress * (end - start) + start);
        element.textContent = current;
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            element.textContent = end;
        }
    };
    
    window.requestAnimationFrame(step);
}

// Animate stats on dashboard load
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsGrid = document.querySelector('.stats-grid');
if (statsGrid) {
    observer.observe(statsGrid);
}

// ===================================
// Logout Functionality
// ===================================

const logoutBtn = document.querySelector('.logout-btn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        handleLogout();
    });
}

function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        // Clear localStorage
        localStorage.removeItem('currentPage');
        localStorage.removeItem('sidebarCollapsed');
        
        // Redirect to login page
        console.log('Logging out...');
        // window.location.href = '/login';
        
        // For demo purposes
        alert('Logout functionality would redirect to login page');
    }
}

// ===================================
// Keyboard Shortcuts
// ===================================

document.addEventListener('keydown', function(e) {
    // Cmd/Ctrl + K for search
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        console.log('Search shortcut triggered');
        // Open search modal
    }
    
    // Cmd/Ctrl + B to toggle sidebar
    if ((e.metaKey || e.ctrlKey) && e.key === 'b') {
        e.preventDefault();
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.toggle('collapsed');
    }
    
    // Number keys to navigate (1-9)
    if (e.key >= '1' && e.key <= '9' && !e.metaKey && !e.ctrlKey) {
        const index = parseInt(e.key) - 1;
        const navItems = document.querySelectorAll('.nav-item');
        if (navItems[index]) {
            navItems[index].click();
        }
    }
});

// ===================================
// Real-time Clock (for demo purposes)
// ===================================

function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-GB', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    
    // You can display this in the topbar if needed
    console.log('Current time:', timeString);
}

// Update clock every minute
setInterval(updateClock, 60000);

// ===================================
// Scroll to Top
// ===================================

let lastScrollTop = 0;
const contentContainer = document.querySelector('.content-container');

window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Show/hide scroll to top button based on scroll position
    if (scrollTop > 300) {
        // Show button
    } else {
        // Hide button
    }
    
    lastScrollTop = scrollTop;
});

// ===================================
// Form Validation Helper
// ===================================

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^\+?[\d\s\-\(\)]+$/;
    return re.test(phone);
}

// ===================================
// Tooltip Functionality
// ===================================

function initTooltips() {
    const tooltipElements = document.querySelectorAll('[title]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const title = this.getAttribute('title');
            if (title) {
                showTooltip(this, title);
            }
        });
        
        element.addEventListener('mouseleave', function() {
            hideTooltip();
        });
    });
}

function showTooltip(element, text) {
    // Create tooltip element
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = text;
    document.body.appendChild(tooltip);
    
    // Position tooltip
    const rect = element.getBoundingClientRect();
    tooltip.style.top = `${rect.top - tooltip.offsetHeight - 8}px`;
    tooltip.style.left = `${rect.left + (rect.width - tooltip.offsetWidth) / 2}px`;
}

function hideTooltip() {
    const tooltip = document.querySelector('.tooltip');
    if (tooltip) {
        tooltip.remove();
    }
}

// ===================================
// Loading State Helper
// ===================================

function showLoading(element) {
    element.classList.add('loading');
}

function hideLoading(element) {
    element.classList.remove('loading');
}

// ===================================
// Toast Notifications
// ===================================

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => toast.classList.add('show'), 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ===================================
// API Helper Functions
// ===================================

async function apiRequest(endpoint, method = 'GET', data = null) {
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        }
    };
    
    if (data) {
        options.body = JSON.stringify(data);
    }
    
    try {
        const response = await fetch(endpoint, options);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('API request failed:', error);
        showToast('An error occurred. Please try again.', 'error');
        throw error;
    }
}

// ===================================
// Local Storage Helpers
// ===================================

function saveToLocalStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error('Failed to save to localStorage:', error);
    }
}

function getFromLocalStorage(key, defaultValue = null) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.error('Failed to get from localStorage:', error);
        return defaultValue;
    }
}

// ===================================
// Date Formatting Helpers
// ===================================

function formatDate(date) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-GB', options);
}

function formatRelativeTime(date) {
    const now = new Date();
    const diff = now - new Date(date);
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (seconds < 60) return 'just now';
    if (minutes < 60) return `${minutes} min${minutes > 1 ? 's' : ''} ago`;
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`;
    
    return formatDate(date);
}

// ===================================
// Console Welcome Message
// ===================================

console.log('%c👋 Welcome to Bashua Operations!', 'font-size: 20px; font-weight: bold; color: #9c7b69;');
console.log('%cDashboard loaded successfully', 'font-size: 14px; color: #4a4a4a;');
console.log('%cVersion 1.0.0', 'font-size: 12px; color: #8a8a8a;');

// ===================================
// Performance Monitoring
// ===================================

window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
});

// ===================================
// Error Handling
// ===================================

window.addEventListener('error', function(e) {
    console.error('Global error:', e.error);
    // You could send this to an error tracking service
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
    // You could send this to an error tracking service
});

// ===================================
// Export functions for use in other scripts
// ===================================

window.bashuaDashboard = {
    navigateToPage,
    showToast,
    apiRequest,
    saveToLocalStorage,
    getFromLocalStorage,
    formatDate,
    formatRelativeTime,
    showLoading,
    hideLoading
};

// ===================================
// CONTENT CREATOR FUNCTIONALITY
// ===================================

// Initialize Content Creator when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initContentCreator();
});

function initContentCreator() {
    // Content Type Selector
    const contentTypeButtons = document.querySelectorAll('.content-type-btn');
    const selectedTypeBadge = document.getElementById('selectedTypeBadge');
    
    contentTypeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            contentTypeButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const typeName = this.querySelector('.type-name').textContent;
            if (selectedTypeBadge) {
                selectedTypeBadge.textContent = typeName;
            }
            
            // Update form based on content type
            updateFormForContentType(this.dataset.type);
        });
    });
    
    // Tone Selector
    const toneButtons = document.querySelectorAll('.tone-btn');
    toneButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            toneButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Length Selector
    const lengthButtons = document.querySelectorAll('.length-btn');
    const lengthDescription = document.getElementById('lengthDescription');
    
    const lengthDescriptions = {
        short: '~100 words, 2-3 paragraphs, quick read',
        medium: '~150-200 words, 3-4 paragraphs',
        long: '~300+ words, comprehensive coverage'
    };
    
    lengthButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            lengthButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const length = this.dataset.length;
            if (lengthDescription) {
                lengthDescription.textContent = lengthDescriptions[length];
            }
        });
    });
    
    // Form Submission
    const contentForm = document.getElementById('contentForm');
    if (contentForm) {
        contentForm.addEventListener('submit', handleContentGeneration);
    }
    
    // Refresh Variations Button
    const refreshBtn = document.getElementById('refreshVariations');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', function() {
            const form = document.getElementById('contentForm');
            if (form) {
                handleContentGeneration(new Event('submit'));
            }
        });
    }
    
    // View Library Button
    const viewLibraryBtn = document.getElementById('viewLibraryBtn');
    if (viewLibraryBtn) {
        viewLibraryBtn.addEventListener('click', function() {
            showToast('Content Library feature coming soon!', 'info');
        });
    }
}

function updateFormForContentType(type) {
    const lengthDescription = document.getElementById('lengthDescription');
    
    // Adjust form hints based on content type
    const hints = {
        linkedin: 'Professional networking content, 150-300 words ideal',
        email: 'Clear subject line and body, 100-200 words recommended',
        blog: 'Long-form content, 500-2000 words for SEO',
        twitter: 'Short and punchy, max 280 characters',
        ad: 'Conversion-focused, clear CTA, 50-100 words'
    };
    
    console.log(`Switched to ${type} content type`);
}

async function handleContentGeneration(e) {
    e.preventDefault();
    
    const form = e.target;
    const generateBtn = document.getElementById('generateBtn');
    const btnText = generateBtn.querySelector('.btn-text');
    const btnLoading = generateBtn.querySelector('.btn-loading');
    const emptyState = document.getElementById('emptyState');
    const variationsContainer = document.getElementById('variationsContainer');
    const refreshBtn = document.getElementById('refreshVariations');
    
    // Get form values
    const topic = document.getElementById('contentTopic').value;
    const keyPoints = document.getElementById('keyPoints').value;
    const tone = document.querySelector('.tone-btn.active')?.dataset.tone || 'professional';
    const length = document.querySelector('.length-btn.active')?.dataset.length || 'medium';
    const includeCTA = document.getElementById('includeCTA').checked;
    const contentType = document.querySelector('.content-type-btn.active')?.dataset.type || 'linkedin';
    
    // Validation
    if (!topic.trim()) {
        showToast('Please enter a topic', 'error');
        return;
    }
    
    // Show loading state
    generateBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoading.style.display = 'flex';
    
    try {
        // Simulate AI generation (in production, this would call your API)
        const variations = await generateContentVariations({
            topic,
            keyPoints,
            tone,
            length,
            includeCTA,
            contentType
        });
        
        // Hide empty state, show variations
        if (emptyState) emptyState.style.display = 'none';
        if (variationsContainer) {
            variationsContainer.style.display = 'block';
            variationsContainer.innerHTML = '';
            
            // Render each variation
            variations.forEach((content, index) => {
                const variationCard = createVariationCard(content, index + 1);
                variationsContainer.appendChild(variationCard);
            });
        }
        
        // Show refresh button
        if (refreshBtn) refreshBtn.style.display = 'flex';
        
        showToast('Content generated successfully!', 'success');
    } catch (error) {
        console.error('Generation error:', error);
        showToast('Failed to generate content. Please try again.', 'error');
    } finally {
        // Reset button state
        generateBtn.disabled = false;
        btnText.style.display = 'block';
        btnLoading.style.display = 'none';
    }
}

async function generateContentVariations(params) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const { topic, keyPoints, tone, length, includeCTA, contentType } = params;
    
    // In production, this would call your backend API which calls OpenAI/Claude
    // For demo, return mock variations
    
    const variations = [];
    const toneStyles = {
        professional: 'formal and business-focused',
        casual: 'friendly and conversational',
        bold: 'confident and attention-grabbing',
        friendly: 'warm and approachable'
    };
    
    const lengthGuide = {
        short: 2,
        medium: 3,
        long: 5
    };
    
    const paragraphCount = lengthGuide[length] || 3;
    
    for (let i = 0; i < 3; i++) {
        let content = '';
        
        // Generate variation based on type
        if (contentType === 'linkedin') {
            content = generateLinkedInPost(topic, tone, paragraphCount, includeCTA, i);
        } else if (contentType === 'email') {
            content = generateEmail(topic, tone, paragraphCount, includeCTA, i);
        } else if (contentType === 'blog') {
            content = generateBlogPost(topic, tone, paragraphCount, includeCTA, i);
        } else if (contentType === 'twitter') {
            content = generateTweet(topic, tone, includeCTA, i);
        } else if (contentType === 'ad') {
            content = generateAdCopy(topic, tone, includeCTA, i);
        }
        
        variations.push(content);
    }
    
    return variations;
}

function generateLinkedInPost(topic, tone, paragraphs, includeCTA, variation) {
    const hooks = [
        `Here's what most people get wrong about ${topic}:`,
        `${topic} isn't what you think it is.`,
        `I've been working with ${topic} for years. Here's what I've learned:`
    ];
    
    const ctas = [
        '\n\n💭 What\'s your experience with this? Drop a comment below.',
        '\n\n👉 Want to learn more? DM me "interested"',
        '\n\n🔔 Follow for more insights like this.'
    ];
    
    let content = hooks[variation] + '\n\n';
    
    if (tone === 'professional') {
        content += `The landscape of ${topic} has evolved significantly. Organizations that adapt early gain substantial competitive advantages.\n\n`;
        content += `Key insights from recent implementations:\n• Strategic integration drives 40% better outcomes\n• Cross-functional collaboration is essential\n• Continuous optimization yields compounding returns\n\n`;
        content += `The future isn't about perfection—it's about consistent improvement and adaptation.`;
    } else if (tone === 'casual') {
        content += `Let's be real: ${topic} sounds complicated, but it doesn't have to be.\n\n`;
        content += `I've seen teams struggle with this for months, only to realize the solution was simpler than they thought.\n\n`;
        content += `The trick? Start small, test fast, and don't overthink it.`;
    } else if (tone === 'bold') {
        content += `Most companies are doing ${topic} completely wrong.\n\n`;
        content += `They waste months on planning when they should be executing. They overcomplicate when simplicity wins.\n\n`;
        content += `Stop waiting for perfect. Start moving.`;
    } else {
        content += `${topic} can feel overwhelming at first—I get it.\n\n`;
        content += `But here's the good news: you don't need to figure it all out at once.\n\n`;
        content += `Small steps, consistent action, and a willingness to learn as you go. That's the formula.`;
    }
    
    if (includeCTA) {
        content += ctas[variation];
    }
    
    return content;
}

function generateEmail(topic, tone, paragraphs, includeCTA, variation) {
    const subjects = [
        `Quick question about ${topic}`,
        `${topic}: Here's what you need to know`,
        `I wanted to share this about ${topic}`
    ];
    
    let content = `**Subject:** ${subjects[variation]}\n\n`;
    content += `Hi [Name],\n\n`;
    
    if (tone === 'professional') {
        content += `I hope this email finds you well.\n\n`;
        content += `I wanted to reach out regarding ${topic}. Based on recent developments in this space, I believe there are significant opportunities for organizations like yours.\n\n`;
        content += `Would you be open to a brief 15-minute conversation to explore how this might apply to your specific situation?`;
    } else {
        content += `Hope you're having a great week!\n\n`;
        content += `Quick note about ${topic}—I think this could be really valuable for what you're working on.\n\n`;
        content += `Free for a quick chat this week? I'd love to share some ideas.`;
    }
    
    content += `\n\nBest regards,\n[Your Name]`;
    
    return content;
}

function generateBlogPost(topic, tone, paragraphs, includeCTA, variation) {
    const titles = [
        `The Complete Guide to ${topic}`,
        `${topic}: Everything You Need to Know in 2025`,
        `How to Master ${topic} (Step-by-Step Guide)`
    ];
    
    let content = `# ${titles[variation]}\n\n`;
    content += `## Introduction\n\n`;
    content += `${topic} has become increasingly important in today's business landscape. In this comprehensive guide, we'll explore the fundamentals, best practices, and actionable strategies you can implement today.\n\n`;
    content += `## Why ${topic} Matters\n\n`;
    content += `Organizations that prioritize ${topic} consistently outperform their competitors. Here's why:\n\n`;
    content += `- **Efficiency**: Streamlined processes save time and resources\n- **Scalability**: Build systems that grow with your business\n- **Competitive Advantage**: Stay ahead of market trends\n\n`;
    content += `## Getting Started\n\n`;
    content += `The key is to start simple and build from there. Focus on these core principles:\n\n`;
    content += `1. Define clear objectives\n2. Implement incremental changes\n3. Measure and optimize continuously\n\n`;
    content += `## Conclusion\n\n`;
    content += `${topic} isn't just a trend—it's a fundamental shift in how modern businesses operate. Start small, stay consistent, and watch the results compound over time.`;
    
    if (includeCTA) {
        content += `\n\n---\n\n**Ready to get started?** [Book a free consultation](#) to discuss your specific needs.`;
    }
    
    return content;
}

function generateTweet(topic, tone, includeCTA, variation) {
    const tweets = [
        `${topic} in 3 steps:\n\n1. Start simple\n2. Test fast\n3. Scale what works\n\nStop overthinking. Start doing.`,
        `Most people overcomplicate ${topic}.\n\nThe reality? It's simpler than you think.\n\nYou just need the right framework.`,
        `${topic} isn't about perfection.\n\nIt's about progress.\n\nSmall wins compound into big results.`
    ];
    
    return tweets[variation];
}

function generateAdCopy(topic, tone, includeCTA, variation) {
    let content = `**Headline:** Transform Your ${topic} in 30 Days\n\n`;
    content += `Tired of slow results? Our proven system helps businesses like yours achieve measurable outcomes fast.\n\n`;
    content += `✓ 40% faster implementation\n`;
    content += `✓ 2x better ROI\n`;
    content += `✓ Zero long-term contracts\n\n`;
    
    if (includeCTA) {
        content += `**[Start Free Trial →]**`;
    }
    
    return content;
}

function createVariationCard(content, index) {
    const card = document.createElement('div');
    card.className = 'variation-card';
    
    // Calculate character count
    const charCount = content.length;
    
    card.innerHTML = `
        <div class="variation-header">
            <span class="variation-label">Variation ${index}</span>
            <div class="variation-actions">
                <button onclick="copyVariation(${index})" title="Copy">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                </button>
                <button onclick="editVariation(${index})" title="Edit">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 20h9"></path>
                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                    </svg>
                </button>
            </div>
        </div>
        <div class="variation-content" id="variation-${index}">${content}</div>
        <div class="char-count">${charCount} characters</div>
        <div class="variation-footer">
            <button class="btn-small btn-outline" onclick="regenerateVariation(${index})">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="23 4 23 10 17 10"></polyline>
                    <polyline points="1 20 1 14 7 14"></polyline>
                    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
                </svg>
                Regenerate
            </button>
            <button class="btn-small btn-outline" onclick="scheduleContent(${index})">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                Schedule
            </button>
            <button class="btn-small btn-solid" onclick="saveContent(${index})">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                    <polyline points="17 21 17 13 7 13 7 21"></polyline>
                    <polyline points="7 3 7 8 15 8"></polyline>
                </svg>
                Save
            </button>
        </div>
    `;
    
    return card;
}

// Variation Actions
window.copyVariation = function(index) {
    const content = document.getElementById(`variation-${index}`).textContent;
    navigator.clipboard.writeText(content).then(() => {
        showToast('Copied to clipboard!', 'success');
    });
};

window.editVariation = function(index) {
    const contentElement = document.getElementById(`variation-${index}`);
    const currentContent = contentElement.textContent;
    
    // Make content editable
    contentElement.contentEditable = true;
    contentElement.style.border = '1px dashed var(--brown)';
    contentElement.style.padding = '8px';
    contentElement.style.borderRadius = '4px';
    contentElement.focus();
    
    // Add save button
    const card = contentElement.closest('.variation-card');
    const existingSaveBtn = card.querySelector('.edit-save-btn');
    
    if (!existingSaveBtn) {
        const saveBtn = document.createElement('button');
        saveBtn.className = 'btn-small btn-solid edit-save-btn';
        saveBtn.style.marginTop = '8px';
        saveBtn.innerHTML = 'Save Changes';
        saveBtn.onclick = function() {
            contentElement.contentEditable = false;
            contentElement.style.border = 'none';
            contentElement.style.padding = '0';
            this.remove();
            showToast('Changes saved!', 'success');
        };
        
        contentElement.after(saveBtn);
    }
};

window.regenerateVariation = async function(index) {
    const contentElement = document.getElementById(`variation-${index}`);
    const originalContent = contentElement.textContent;
    
    contentElement.style.opacity = '0.5';
    contentElement.textContent = 'Regenerating...';
    
    // Simulate regeneration
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    contentElement.style.opacity = '1';
    contentElement.textContent = originalContent + '\n\n[Regenerated version would appear here]';
    
    showToast('Variation regenerated!', 'success');
};

window.scheduleContent = function(index) {
    showToast('Scheduling feature coming soon!', 'info');
    console.log(`Schedule content variation ${index}`);
};

window.saveContent = function(index) {
    const content = document.getElementById(`variation-${index}`).textContent;
    
    // Save to localStorage
    const savedContent = getFromLocalStorage('savedContent', []);
    savedContent.push({
        content,
        createdAt: new Date().toISOString(),
        id: Date.now()
    });
    saveToLocalStorage('savedContent', savedContent);
    
    showToast('Content saved to library!', 'success');
};

// ===================================
// OUTREACH MANAGER FUNCTIONALITY
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    initOutreachManager();
});

function initOutreachManager() {
    // Create Campaign Button
    const createCampaignBtn = document.getElementById('createCampaignBtn');
    if (createCampaignBtn) {
        createCampaignBtn.addEventListener('click', openCampaignBuilder);
    }
    
    // Campaign Filters
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            filterCampaigns(filter);
        });
    });
    
    // Enable Follow-up Checkbox
    const enableFollowup = document.getElementById('enableFollowup');
    if (enableFollowup) {
        enableFollowup.addEventListener('change', function() {
            const followupSection = document.getElementById('followupSection');
            if (followupSection) {
                followupSection.style.display = this.checked ? 'block' : 'none';
            }
        });
    }
    
    // Contact File Upload
    const contactFile = document.getElementById('contactFile');
    if (contactFile) {
        contactFile.addEventListener('change', handleContactUpload);
    }
}

// Campaign Actions
window.viewCampaign = function(id) {
    showToast(`Opening campaign ${id} details...`, 'info');
    console.log(`View campaign ${id}`);
    // In production, navigate to campaign detail page
};

window.pauseCampaign = function(id) {
    if (confirm('Are you sure you want to pause this campaign?')) {
        showToast('Campaign paused successfully', 'success');
        console.log(`Paused campaign ${id}`);
        // In production, call API to pause campaign
    }
};

window.resumeCampaign = function(id) {
    showToast('Campaign resumed successfully', 'success');
    console.log(`Resumed campaign ${id}`);
    // In production, call API to resume campaign
};

window.deleteCampaign = function(id) {
    if (confirm('Are you sure you want to delete this campaign? This action cannot be undone.')) {
        showToast('Campaign deleted', 'success');
        console.log(`Deleted campaign ${id}`);
        // In production, call API to delete campaign
    }
};

// Filter Campaigns
function filterCampaigns(filter) {
    const campaignCards = document.querySelectorAll('.campaign-card');
    
    campaignCards.forEach(card => {
        const status = card.dataset.status;
        
        if (filter === 'all' || status === filter) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Campaign Builder Modal
let currentStep = 1;
const totalSteps = 4;

function openCampaignBuilder() {
    const modal = document.getElementById('campaignBuilderModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        currentStep = 1;
        showStep(1);
    }
}

window.closeCampaignBuilder = function() {
    const modal = document.getElementById('campaignBuilderModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        resetBuilder();
    }
};

window.nextStep = function() {
    // Validate current step
    if (!validateStep(currentStep)) {
        return;
    }
    
    // Mark current step as completed
    const currentStepEl = document.querySelector(`.step[data-step="${currentStep}"]`);
    if (currentStepEl) {
        currentStepEl.classList.add('completed');
    }
    
    if (currentStep < totalSteps) {
        currentStep++;
        showStep(currentStep);
        updateReview();
    }
};

window.previousStep = function() {
    if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
    }
};

function showStep(step) {
    // Update step indicators
    const steps = document.querySelectorAll('.step');
    steps.forEach((s, index) => {
        if (index + 1 === step) {
            s.classList.add('active');
        } else if (index + 1 < step) {
            s.classList.add('completed');
            s.classList.remove('active');
        } else {
            s.classList.remove('active', 'completed');
        }
    });
    
    // Show/hide step content
    const contents = document.querySelectorAll('.builder-step-content');
    contents.forEach((content, index) => {
        if (index + 1 === step) {
            content.classList.add('active');
        } else {
            content.classList.remove('active');
        }
    });
    
    // Update navigation buttons
    const prevBtn = document.getElementById('prevStepBtn');
    const nextBtn = document.getElementById('nextStepBtn');
    const launchBtn = document.getElementById('launchBtn');
    
    if (prevBtn) prevBtn.style.display = step === 1 ? 'none' : 'block';
    if (nextBtn) nextBtn.style.display = step === totalSteps ? 'none' : 'block';
    if (launchBtn) launchBtn.style.display = step === totalSteps ? 'block' : 'none';
}

function validateStep(step) {
    if (step === 1) {
        const campaignName = document.getElementById('campaignName');
        if (!campaignName || !campaignName.value.trim()) {
            showToast('Please enter a campaign name', 'error');
            campaignName?.focus();
            return false;
        }
    }
    
    if (step === 2) {
        // Check if contacts uploaded or CRM connected
        // For demo, we'll assume it's valid
        console.log('Validating contacts...');
    }
    
    if (step === 3) {
        const messageBody = document.getElementById('messageBody');
        if (!messageBody || !messageBody.value.trim()) {
            showToast('Please enter a message template', 'error');
            messageBody?.focus();
            return false;
        }
    }
    
    return true;
}

function updateReview() {
    if (currentStep !== 4) return;
    
    // Update review values
    const campaignName = document.getElementById('campaignName')?.value || '-';
    const campaignType = document.querySelector('input[name="campaignType"]:checked')?.value || '-';
    const messageBody = document.getElementById('messageBody')?.value || 'No message yet';
    
    const reviewName = document.getElementById('reviewName');
    const reviewType = document.getElementById('reviewType');
    const reviewContacts = document.getElementById('reviewContacts');
    const messagePreview = document.getElementById('messagePreview');
    
    if (reviewName) reviewName.textContent = campaignName;
    if (reviewType) reviewType.textContent = campaignType.charAt(0).toUpperCase() + campaignType.slice(1);
    if (reviewContacts) reviewContacts.textContent = '0 uploaded';
    if (messagePreview) {
        messagePreview.textContent = messageBody.replace(/{{FirstName}}/g, 'John')
                                                 .replace(/{{LastName}}/g, 'Smith')
                                                 .replace(/{{Company}}/g, 'Acme Corp')
                                                 .replace(/{{Role}}/g, 'Marketing Director');
    }
}

function resetBuilder() {
    currentStep = 1;
    
    // Reset form
    const form = document.querySelector('.campaign-builder');
    if (form) {
        const inputs = form.querySelectorAll('input[type="text"], textarea');
        inputs.forEach(input => input.value = '');
    }
    
    // Reset steps
    const steps = document.querySelectorAll('.step');
    steps.forEach(s => s.classList.remove('active', 'completed'));
}

window.launchCampaign = function() {
    const campaignName = document.getElementById('campaignName')?.value;
    
    if (!campaignName) {
        showToast('Cannot launch campaign without a name', 'error');
        return;
    }
    
    // Show loading state
    const launchBtn = document.getElementById('launchBtn');
    if (launchBtn) {
        launchBtn.disabled = true;
        launchBtn.textContent = 'Launching...';
    }
    
    // Simulate API call
    setTimeout(() => {
        showToast(`Campaign "${campaignName}" launched successfully!`, 'success');
        closeCampaignBuilder();
        
        // Reset button
        if (launchBtn) {
            launchBtn.disabled = false;
            launchBtn.textContent = 'Launch Campaign';
        }
        
        // In production, refresh campaign list
    }, 1500);
};

// Insert Variable into Message
window.insertVariable = function(variable) {
    const messageBody = document.getElementById('messageBody');
    if (messageBody) {
        const cursorPos = messageBody.selectionStart;
        const textBefore = messageBody.value.substring(0, cursorPos);
        const textAfter = messageBody.value.substring(cursorPos);
        
        messageBody.value = textBefore + variable + textAfter;
        messageBody.focus();
        messageBody.selectionStart = messageBody.selectionEnd = cursorPos + variable.length;
    }
};

// Handle Contact Upload
function handleContactUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    if (!file.name.endsWith('.csv')) {
        showToast('Please upload a CSV file', 'error');
        return;
    }
    
    showToast(`Uploaded ${file.name}`, 'success');
    console.log('Processing contact file:', file.name);
    
    // In production, parse CSV and store contacts
    const reviewContacts = document.getElementById('reviewContacts');
    if (reviewContacts) {
        reviewContacts.textContent = 'Sample data (not real contacts)';
    }
}

// Connect CRM
window.connectCRM = function() {
    showToast('CRM integration coming soon!', 'info');
    console.log('Opening CRM connection dialog...');
    
    // In production, open OAuth flow or API connection dialog
};

// ===================================
// LEAD PIPELINE FUNCTIONALITY
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    initLeadPipeline();
});

function initLeadPipeline() {
    initDragAndDrop();
    initLeadDetailsModal();
    initPipelineFilters();
    
    // Add Lead Button
    const addLeadBtn = document.getElementById('addLeadBtn');
    if (addLeadBtn) {
        addLeadBtn.addEventListener('click', function() {
            showToast('Add Lead form coming soon!', 'info');
        });
    }
    
    // Import Leads Button
    const importLeadsBtn = document.getElementById('importLeadsBtn');
    if (importLeadsBtn) {
        importLeadsBtn.addEventListener('click', function() {
            showToast('Import Leads feature coming soon!', 'info');
        });
    }
}

// Drag and Drop Functionality
function initDragAndDrop() {
    const leadCards = document.querySelectorAll('.lead-card');
    const columns = document.querySelectorAll('.column-content');
    
    leadCards.forEach(card => {
        card.addEventListener('dragstart', handleDragStart);
        card.addEventListener('dragend', handleDragEnd);
    });
    
    columns.forEach(column => {
        column.addEventListener('dragover', handleDragOver);
        column.addEventListener('drop', handleDrop);
        column.addEventListener('dragleave', handleDragLeave);
        column.addEventListener('dragenter', handleDragEnter);
    });
}

let draggedElement = null;

function handleDragStart(e) {
    draggedElement = this;
    this.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragEnd(e) {
    this.classList.remove('dragging');
    
    // Remove drag-over class from all columns
    document.querySelectorAll('.column-content').forEach(col => {
        col.classList.remove('drag-over');
    });
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    return false;
}

function handleDragEnter(e) {
    this.classList.add('drag-over');
}

function handleDragLeave(e) {
    if (e.target.classList.contains('column-content')) {
        this.classList.remove('drag-over');
    }
}

function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    
    this.classList.remove('drag-over');
    
    if (draggedElement && draggedElement !== this) {
        // Get the new stage
        const newStage = this.dataset.stage;
        const leadId = draggedElement.dataset.leadId;
        
        // Move the card
        const addCardBtn = this.querySelector('.add-card-btn');
        if (addCardBtn) {
            this.insertBefore(draggedElement, addCardBtn);
        } else {
            this.appendChild(draggedElement);
        }
        
        // Update lead stage in backend
        updateLeadStage(leadId, newStage);
        
        // Show success message
        showToast(`Lead moved to ${newStage}`, 'success');
    }
    
    return false;
}

function updateLeadStage(leadId, newStage) {
    console.log(`Updating lead ${leadId} to stage: ${newStage}`);
    
    // In production, call API to update lead stage
    // await apiRequest(`/api/leads/${leadId}`, 'PATCH', { stage: newStage });
}

// Lead Details Modal
function initLeadDetailsModal() {
    const detailsTabs = document.querySelectorAll('.details-tab');
    
    detailsTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.dataset.tab;
            switchDetailsTab(tabName);
        });
    });
}

function switchDetailsTab(tabName) {
    // Remove active from all tabs
    document.querySelectorAll('.details-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active from all tab contents
    document.querySelectorAll('.details-tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Add active to selected tab
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    document.querySelector(`[data-tab-content="${tabName}"]`).classList.add('active');
}

window.viewLeadDetails = function(leadId) {
    const modal = document.getElementById('leadDetailsModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Load lead data
        loadLeadDetails(leadId);
    }
};

window.closeLeadDetails = function() {
    const modal = document.getElementById('leadDetailsModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
};

function loadLeadDetails(leadId) {
    console.log(`Loading details for lead ${leadId}`);
    
    // In production, fetch from API
    // const lead = await apiRequest(`/api/leads/${leadId}`);
    
    // Mock data for demo
    const mockLeads = {
        1: {
            name: 'Sarah Mitchell',
            company: 'TechRecruit Solutions',
            email: 'sarah@techrecruit.com',
            phone: '+44 20 1234 5678',
            score: 9.2,
            value: '£12,000'
        },
        2: {
            name: 'James Chen',
            company: 'CloudServe',
            email: 'james@cloudserve.com',
            phone: '+44 20 9876 5432',
            score: 7.5,
            value: '£8,000'
        },
        3: {
            name: 'Priya Sharma',
            company: 'Urban Threads',
            email: 'priya@urbanthreads.com',
            phone: '+44 20 5555 1234',
            score: 6.8,
            value: '£15,000'
        }
    };
    
    const lead = mockLeads[leadId] || mockLeads[1];
    
    // Update modal with lead data
    document.getElementById('leadDetailsName').textContent = lead.name;
    document.getElementById('leadDetailsCompany').textContent = lead.company;
    
    // Update other fields as needed
}

// Pipeline Filters
function initPipelineFilters() {
    const viewButtons = document.querySelectorAll('.view-btn');
    
    viewButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            viewButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const view = this.dataset.view;
            switchView(view);
        });
    });
    
    // Search functionality
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            filterLeads(e.target.value);
        });
    }
}

function switchView(view) {
    if (view === 'list') {
        showToast('List view coming soon!', 'info');
    } else {
        // Already in kanban view
        console.log('Kanban view active');
    }
}

function filterLeads(searchTerm) {
    const leadCards = document.querySelectorAll('.lead-card');
    const term = searchTerm.toLowerCase();
    
    leadCards.forEach(card => {
        const name = card.querySelector('.lead-name')?.textContent.toLowerCase() || '';
        const company = card.querySelector('.lead-company')?.textContent.toLowerCase() || '';
        
        if (name.includes(term) || company.includes(term)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Quick Actions
window.callLead = function(leadId) {
    showToast(`Initiating call to lead ${leadId}...`, 'info');
    console.log(`Call lead ${leadId}`);
};

window.emailLead = function(leadId) {
    showToast(`Opening email composer for lead ${leadId}...`, 'info');
    console.log(`Email lead ${leadId}`);
};

// Lead Scoring (for display/demo purposes)
function calculateLeadScore(lead) {
    // Mock scoring algorithm
    let score = 5.0;
    
    // Add points for engagement
    if (lead.emailOpened) score += 1.5;
    if (lead.linkedinViewed) score += 1.0;
    if (lead.replied) score += 2.0;
    
    // Add points for fit
    if (lead.companySize > 50) score += 1.0;
    if (lead.budget > 10000) score += 1.5;
    
    return Math.min(score, 10).toFixed(1);
}

// Export Lead Data
window.exportLeads = function() {
    showToast('Exporting leads...', 'info');
    
    // Gather all leads
    const leads = [];
    document.querySelectorAll('.lead-card').forEach(card => {
        const leadId = card.dataset.leadId;
        const name = card.querySelector('.lead-name')?.textContent;
        const company = card.querySelector('.lead-company')?.textContent;
        const value = card.querySelector('.lead-value')?.textContent;
        const score = card.querySelector('.lead-score')?.textContent;
        
        leads.push({ leadId, name, company, value, score });
    });
    
    console.log('Leads to export:', leads);
    
    // In production, generate CSV or Excel file
    showToast('Export complete! (demo mode)', 'success');
};

// ===================================
// SOCIAL MEDIA FUNCTIONALITY
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    initSocialMedia();
});

function initSocialMedia() {
    initSocialViews();
    initPlatformFilters();
    initCalendarNavigation();
    
    // Create Post Button
    const createPostBtn = document.getElementById('createPostBtn');
    if (createPostBtn) {
        createPostBtn.addEventListener('click', function() {
            showToast('Post composer coming soon!', 'info');
        });
    }
    
    // Bulk Upload Button
    const bulkUploadBtn = document.getElementById('bulkUploadBtn');
    if (bulkUploadBtn) {
        bulkUploadBtn.addEventListener('click', function() {
            showToast('Bulk upload feature coming soon!', 'info');
        });
    }
}

// Social Media Views
function initSocialViews() {
    const viewButtons = document.querySelectorAll('.view-btn');
    
    viewButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            viewButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const view = this.dataset.view;
            switchSocialView(view);
        });
    });
}

function switchSocialView(view) {
    // Hide all views
    document.querySelectorAll('.social-view').forEach(v => {
        v.classList.remove('active');
    });
    
    // Show selected view
    const viewMap = {
        'calendar': 'calendarView',
        'queue': 'queueView',
        'published': 'publishedView'
    };
    
    const viewId = viewMap[view];
    if (viewId) {
        document.getElementById(viewId)?.classList.add('active');
    }
}

// Platform Filters
function initPlatformFilters() {
    const filterButtons = document.querySelectorAll('.platform-filter');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const platform = this.dataset.platform;
            filterByPlatform(platform);
        });
    });
}

function filterByPlatform(platform) {
    console.log(`Filtering by platform: ${platform}`);
    
    if (platform === 'all') {
        // Show all posts
        showToast('Showing all platforms', 'info');
    } else {
        // Filter by specific platform
        showToast(`Filtering by ${platform}`, 'info');
        
        // In production, filter posts by platform
        // This would update the calendar dots, queue posts, and published posts
    }
}

// Calendar Navigation
let currentMonth = 11; // December (0-indexed)
let currentYear = 2024;

function initCalendarNavigation() {
    const prevBtn = document.getElementById('prevMonth');
    const nextBtn = document.getElementById('nextMonth');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            updateCalendar();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            updateCalendar();
        });
    }
}

function updateCalendar() {
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    const calendarTitle = document.getElementById('calendarTitle');
    if (calendarTitle) {
        calendarTitle.textContent = `${monthNames[currentMonth]} ${currentYear}`;
    }
    
    // In production, regenerate calendar grid for new month
    console.log(`Calendar updated to ${monthNames[currentMonth]} ${currentYear}`);
}

// Post Actions
window.editPost = function(postId) {
    showToast(`Opening editor for post ${postId}...`, 'info');
    console.log(`Edit post ${postId}`);
    
    // In production, open post editor modal
};

window.previewPost = function(postId) {
    showToast(`Opening preview for post ${postId}...`, 'info');
    console.log(`Preview post ${postId}`);
    
    // In production, show post preview modal
};

window.deletePost = function(postId) {
    if (confirm('Are you sure you want to delete this post?')) {
        showToast('Post deleted successfully', 'success');
        console.log(`Deleted post ${postId}`);
        
        // In production, call API to delete post
        // Remove post card from DOM
    }
};

// Schedule Post
window.schedulePost = function(postData) {
    console.log('Scheduling post:', postData);
    
    // In production, send to API
    // POST /api/social-media/posts
    // {
    //   content: "...",
    //   platforms: ["linkedin", "twitter"],
    //   scheduledFor: "2024-12-16T14:00:00Z",
    //   media: []
    // }
    
    showToast('Post scheduled successfully!', 'success');
};

// Publish Now
window.publishNow = function(postId) {
    if (confirm('Publish this post immediately?')) {
        showToast('Publishing post...', 'info');
        
        setTimeout(() => {
            showToast('Post published successfully!', 'success');
            console.log(`Published post ${postId}`);
            
            // In production, call API to publish
            // Update UI to move post to published view
        }, 1500);
    }
};

// Analytics for Published Posts
window.viewPostAnalytics = function(postId) {
    showToast(`Loading analytics for post ${postId}...`, 'info');
    console.log(`View analytics for post ${postId}`);
    
    // In production, open analytics modal with:
    // - Impressions over time chart
    // - Engagement breakdown
    // - Click-through rate
    // - Best performing platforms
    // - Audience demographics
};

// Bulk Actions
window.bulkSchedule = function(posts) {
    console.log('Bulk scheduling posts:', posts);
    
    // In production:
    // - Parse CSV/Excel file
    // - Validate post data
    // - Schedule multiple posts
    // - Show progress bar
    
    showToast(`Scheduled ${posts.length} posts successfully!`, 'success');
};

// Calendar Day Click
document.querySelectorAll('.calendar-day').forEach(day => {
    day.addEventListener('click', function() {
        if (this.classList.contains('empty')) return;
        
        const dayNumber = this.querySelector('.day-number')?.textContent;
        if (dayNumber) {
            showDayDetails(dayNumber);
        }
    });
});

function showDayDetails(dayNumber) {
    console.log(`Showing posts for day ${dayNumber}`);
    
    // In production, show modal with:
    // - All posts scheduled for this day
    // - Time slots
    // - Quick edit options
    // - Add new post button
    
    showToast(`Viewing posts for day ${dayNumber}`, 'info');
}

// Auto-save Draft
let draftSaveTimeout;

window.saveDraft = function(content) {
    clearTimeout(draftSaveTimeout);
    
    draftSaveTimeout = setTimeout(() => {
        // Save to localStorage
        saveToLocalStorage('socialMediaDraft', {
            content,
            savedAt: new Date().toISOString()
        });
        
        console.log('Draft auto-saved');
    }, 1000);
};

// Best Time to Post
window.suggestBestTime = function(platform) {
    // Mock algorithm based on platform and audience
    const bestTimes = {
        linkedin: ['Tuesday 10:00 AM', 'Wednesday 12:00 PM', 'Thursday 9:00 AM'],
        twitter: ['Monday 9:00 AM', 'Wednesday 3:00 PM', 'Friday 11:00 AM'],
        instagram: ['Monday 11:00 AM', 'Wednesday 7:00 PM', 'Friday 2:00 PM']
    };
    
    const times = bestTimes[platform] || ['Tuesday 10:00 AM'];
    
    showToast(`Best times for ${platform}: ${times[0]}`, 'info');
    console.log(`Best posting times for ${platform}:`, times);
    
    return times;
};

// ===================================
// EMAIL CAMPAIGNS FUNCTIONALITY
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    initEmailCampaigns();
});

function initEmailCampaigns() {
    initEmailTabs();
    
    // Create Campaign Button
    const createCampaignEmailBtn = document.getElementById('createCampaignEmailBtn');
    if (createCampaignEmailBtn) {
        createCampaignEmailBtn.addEventListener('click', function() {
            showToast('Email campaign builder coming soon!', 'info');
        });
    }
    
    // Template Library Button
    const templateLibraryBtn = document.getElementById('templateLibraryBtn');
    if (templateLibraryBtn) {
        templateLibraryBtn.addEventListener('click', function() {
            showToast('Template library coming soon!', 'info');
        });
    }
}

// Email Tabs
function initEmailTabs() {
    const emailTabs = document.querySelectorAll('.email-tab');
    
    emailTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.dataset.tab;
            switchEmailTab(tabName);
        });
    });
}

function switchEmailTab(tabName) {
    // Remove active from all tabs
    document.querySelectorAll('.email-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active from all tab contents
    document.querySelectorAll('.email-tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Add active to selected tab
    document.querySelector(`[data-tab="${tabName}"]`)?.classList.add('active');
    document.querySelector(`[data-tab-content="${tabName}"]`)?.classList.add('active');
}

// Campaign Actions
window.viewEmailReport = function(campaignId) {
    showToast(`Loading report for campaign ${campaignId}...`, 'info');
    console.log(`View email report for campaign ${campaignId}`);
    
    // In production, open detailed report modal with:
    // - Open rate over time chart
    // - Click-through rate graph
    // - Geographic distribution
    // - Device breakdown
    // - Link performance
    // - Unsubscribe reasons
};

window.duplicateCampaign = function(campaignId) {
    showToast(`Duplicating campaign ${campaignId}...`, 'success');
    console.log(`Duplicate campaign ${campaignId}`);
    
    // In production:
    // - Clone campaign data
    // - Append " (Copy)" to name
    // - Set status to draft
    // - Open in editor
};

window.pauseEmailCampaign = function(campaignId) {
    if (confirm('Are you sure you want to pause this campaign?')) {
        showToast('Campaign paused successfully', 'success');
        console.log(`Paused campaign ${campaignId}`);
        
        // In production:
        // - Stop sending emails
        // - Update status to paused
        // - Show resume option
    }
};

window.editCampaign = function(campaignId) {
    showToast(`Opening editor for campaign ${campaignId}...`, 'info');
    console.log(`Edit campaign ${campaignId}`);
    
    // In production, open email editor with:
    // - Drag-and-drop email builder
    // - Template selector
    // - Subject line A/B testing
    // - Preview in multiple email clients
    // - Audience segmentation
};

window.previewEmail = function(campaignId) {
    showToast(`Opening preview for campaign ${campaignId}...`, 'info');
    console.log(`Preview email ${campaignId}`);
    
    // In production, show modal with:
    // - Desktop email client view
    // - Mobile email client view
    // - Dark mode preview
    // - Plain text version
};

window.sendTestEmail = function(campaignId) {
    const email = prompt('Enter email address for test send:');
    
    if (email && validateEmail(email)) {
        showToast(`Test email sent to ${email}`, 'success');
        console.log(`Send test email for campaign ${campaignId} to ${email}`);
        
        // In production:
        // - Render email template
        // - Send via email service
        // - Track test send
    } else if (email) {
        showToast('Please enter a valid email address', 'error');
    }
};

window.sendNowEmail = function(campaignId) {
    if (confirm('Send this campaign immediately instead of waiting for scheduled time?')) {
        showToast('Sending campaign now...', 'info');
        
        setTimeout(() => {
            showToast('Campaign sent successfully!', 'success');
            console.log(`Sent campaign ${campaignId} immediately`);
            
            // In production:
            // - Cancel scheduled send
            // - Start immediate send
            // - Update status
            // - Move to active campaigns
        }, 1500);
    }
};

window.cancelScheduled = function(campaignId) {
    if (confirm('Cancel this scheduled campaign? It will be moved to drafts.')) {
        showToast('Campaign cancelled and moved to drafts', 'success');
        console.log(`Cancelled scheduled campaign ${campaignId}`);
        
        // In production:
        // - Cancel scheduled send
        // - Update status to draft
        // - Move to drafts tab
    }
};

window.loadMoreCampaigns = function() {
    showToast('Loading more campaigns...', 'info');
    
    // In production:
    // - Fetch next page of campaigns
    // - Append to list
    // - Update pagination
};

// Email Validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// A/B Testing
window.setupABTest = function(campaignId) {
    console.log(`Setup A/B test for campaign ${campaignId}`);
    
    // In production, open A/B test modal with:
    // - Subject line variants
    // - Sender name variants
    // - Send time variants
    // - Content variants
    // - Test duration
    // - Winner selection criteria
    
    showToast('A/B testing feature coming soon!', 'info');
};

// Audience Segmentation
window.segmentAudience = function(criteria) {
    console.log('Segmenting audience:', criteria);
    
    // In production:
    // - Filter contacts by criteria
    // - Create segment
    // - Save for future use
    // - Show segment size
    
    // Example criteria:
    // {
    //   location: 'London',
    //   engagement: 'high',
    //   lastOpen: 'within_30_days',
    //   tags: ['customer', 'premium']
    // }
};

// Email Performance Tracking
window.trackEmailPerformance = function(campaignId) {
    console.log(`Tracking performance for campaign ${campaignId}`);
    
    // In production, fetch and display:
    // - Real-time open tracking
    // - Click tracking
    // - Conversion tracking
    // - Revenue attribution
    // - Comparative analysis
};

// Unsubscribe Management
window.handleUnsubscribe = function(contactId, campaignId) {
    console.log(`Handle unsubscribe: contact ${contactId} from campaign ${campaignId}`);
    
    // In production:
    // - Update contact preferences
    // - Show unsubscribe reason survey
    // - Remove from active lists
    // - Comply with regulations (GDPR, CAN-SPAM)
};

// Email Template Management
window.saveAsTemplate = function(campaignId) {
    const templateName = prompt('Enter template name:');
    
    if (templateName) {
        showToast(`Template "${templateName}" saved successfully`, 'success');
        console.log(`Save campaign ${campaignId} as template: ${templateName}`);
        
        // In production:
        // - Extract email HTML/design
        // - Save to templates library
        // - Add tags/categories
        // - Make available for reuse
    }
};

// Deliverability Check
window.checkDeliverability = function(campaignId) {
    showToast('Checking email deliverability...', 'info');
    
    setTimeout(() => {
        const score = 87; // Mock score
        showToast(`Deliverability score: ${score}/100`, score > 80 ? 'success' : 'warning');
        
        // In production, check:
        // - SPF/DKIM/DMARC authentication
        // - Spam score
        // - Broken links
        // - Image-to-text ratio
        // - Blacklist status
        // - Subject line quality
    }, 1500);
};

// Email Preview in Multiple Clients
window.previewMultipleClients = function(campaignId) {
    console.log(`Preview campaign ${campaignId} in multiple email clients`);
    
    // In production, show previews for:
    // - Gmail (Desktop, Mobile)
    // - Outlook (Windows, Mac, Web)
    // - Apple Mail (Desktop, iOS)
    // - Yahoo Mail
    // - Dark mode variations
    
    showToast('Multi-client preview coming soon!', 'info');
};

// Export Campaign Results
window.exportCampaignResults = function(campaignId) {
    showToast(`Exporting results for campaign ${campaignId}...`, 'info');
    
    setTimeout(() => {
        console.log(`Export campaign ${campaignId} results`);
        
        // In production:
        // - Generate CSV/Excel with all metrics
        // - Include contact-level data
        // - Add charts/graphs
        // - Create PDF report
        
        showToast('Results exported successfully!', 'success');
    }, 1000);
};

// ===================================
// ANALYTICS FUNCTIONALITY
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    initAnalytics();
});

function initAnalytics() {
    // Only initialize charts if we're on the analytics page
    const analyticsContent = document.getElementById('analytics-content');
    if (!analyticsContent) return;
    
    // Wait for page to be visible before rendering charts
    const observer = new MutationObserver((mutations) => {
        if (analyticsContent.classList.contains('active')) {
            initializeCharts();
            observer.disconnect();
        }
    });
    
    // Check if already visible
    if (analyticsContent.classList.contains('active')) {
        initializeCharts();
    } else {
        observer.observe(analyticsContent, { attributes: true, attributeFilter: ['class'] });
    }
    
    // Export Report Button
    const exportBtn = document.getElementById('exportReportBtn');
    if (exportBtn) {
        exportBtn.addEventListener('click', exportAnalyticsReport);
    }
}

function initializeCharts() {
    // Check if charts already exist
    if (window.analyticsCharts) return;
    
    window.analyticsCharts = {
        revenue: renderRevenueChart(),
        leadSource: renderLeadSourceChart()
    };
}

// Revenue Chart
function renderRevenueChart() {
    const canvas = document.getElementById('revenueChart');
    if (!canvas) return null;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Mock data
    const data = [45, 52, 48, 65, 58, 72, 68, 85, 78, 92, 88, 95, 102, 98, 110, 105, 122, 118, 135, 128, 142, 138, 150, 145, 158, 152, 168, 162, 175, 170];
    const lastPeriodData = [38, 42, 40, 50, 48, 58, 55, 68, 65, 75, 72, 82, 78, 88, 85, 92, 90, 98, 95, 105, 102, 110, 108, 115, 112, 120, 118, 125, 122, 128];
    
    const max = Math.max(...data, ...lastPeriodData);
    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    
    // Draw grid lines
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
        const y = padding + (chartHeight / 5) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
    }
    
    // Draw last period data (grey line)
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 2;
    ctx.beginPath();
    lastPeriodData.forEach((value, index) => {
        const x = padding + (chartWidth / (lastPeriodData.length - 1)) * index;
        const y = padding + chartHeight - (value / max) * chartHeight;
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    ctx.stroke();
    
    // Draw current period data (blue line)
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 3;
    ctx.beginPath();
    data.forEach((value, index) => {
        const x = padding + (chartWidth / (data.length - 1)) * index;
        const y = padding + chartHeight - (value / max) * chartHeight;
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    ctx.stroke();
    
    // Draw gradient fill
    const gradient = ctx.createLinearGradient(0, padding, 0, height - padding);
    gradient.addColorStop(0, 'rgba(59, 130, 246, 0.2)');
    gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    data.forEach((value, index) => {
        const x = padding + (chartWidth / (data.length - 1)) * index;
        const y = padding + chartHeight - (value / max) * chartHeight;
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    ctx.lineTo(width - padding, height - padding);
    ctx.lineTo(padding, height - padding);
    ctx.closePath();
    ctx.fill();
    
    return { canvas, data };
}

// Lead Source Pie Chart
function renderLeadSourceChart() {
    const canvas = document.getElementById('leadSourceChart');
    if (!canvas) return null;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 3;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Data
    const data = [
        { label: 'LinkedIn', value: 42, color: '#0a66c2' },
        { label: 'Email', value: 28, color: '#8b5cf6' },
        { label: 'Referral', value: 18, color: '#10b981' },
        { label: 'Other', value: 12, color: '#94a3b8' }
    ];
    
    let currentAngle = -Math.PI / 2;
    
    data.forEach(item => {
        const sliceAngle = (item.value / 100) * 2 * Math.PI;
        
        // Draw slice
        ctx.fillStyle = item.color;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
        ctx.closePath();
        ctx.fill();
        
        // Draw border
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        currentAngle += sliceAngle;
    });
    
    // Draw center circle (donut effect)
    ctx.fillStyle = '#f5f1ed';
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.6, 0, 2 * Math.PI);
    ctx.fill();
    
    return { canvas, data };
}

// Export Analytics Report
function exportAnalyticsReport() {
    showToast('Generating analytics report...', 'info');
    
    setTimeout(() => {
        console.log('Export analytics report');
        
        // In production:
        // - Gather all metrics
        // - Generate charts as images
        // - Create PDF with all data
        // - Include date range, filters
        // - Add executive summary
        // - Export as PDF/Excel
        
        showToast('Report downloaded successfully!', 'success');
    }, 1500);
}

// Time Range Selector
const timeRangeSelect = document.querySelector('.time-range-select');
if (timeRangeSelect) {
    timeRangeSelect.addEventListener('change', function() {
        const range = this.value;
        updateAnalyticsPeriod(range);
    });
}

function updateAnalyticsPeriod(range) {
    console.log(`Update analytics for period: ${range}`);
    showToast(`Loading data for ${range}...`, 'info');
    
    // In production:
    // - Fetch new data for selected period
    // - Re-render all charts
    // - Update KPIs
    // - Recalculate trends
    
    setTimeout(() => {
        // Simulate data refresh
        if (window.analyticsCharts) {
            initializeCharts();
        }
        showToast('Analytics updated', 'success');
    }, 1000);
}

// Calculate Trends
function calculateTrend(current, previous) {
    if (previous === 0) return 0;
    return ((current - previous) / previous * 100).toFixed(1);
}

// Format Currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

// Format Large Numbers
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// Drill Down into Metrics
window.drillDownMetric = function(metric) {
    console.log(`Drill down into ${metric}`);
    
    // In production, open detailed modal with:
    // - Time series chart
    // - Breakdown by source
    // - Comparison with benchmarks
    // - Export options
    
    showToast(`Detailed ${metric} analysis coming soon!`, 'info');
};
// ===================================
// INTEGRATIONS FUNCTIONALITY
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    initIntegrations();
});

function initIntegrations() {
    initCategoryFilters();
    
    // API Keys Button
    const apiKeysBtn = document.getElementById('viewApiKeysBtn');
    if (apiKeysBtn) {
        apiKeysBtn.addEventListener('click', function() {
            showToast('API Keys management coming soon!', 'info');
        });
    }
    
    // Browse All Button
    const browseBtn = document.getElementById('browseIntegrationsBtn');
    if (browseBtn) {
        browseBtn.addEventListener('click', function() {
            showToast('Browse integrations directory coming soon!', 'info');
        });
    }
}

// Category Filters
function initCategoryFilters() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.dataset.category;
            filterIntegrationsByCategory(category);
        });
    });
}

function filterIntegrationsByCategory(category) {
    const integrationCards = document.querySelectorAll('.integration-card.available');
    
    integrationCards.forEach(card => {
        const cardCategory = card.dataset.category;
        
        if (category === 'all' || cardCategory === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Connect Integration
window.connectIntegration = function(integration) {
    showToast(`Connecting to ${integration}...`, 'info');
    
    setTimeout(() => {
        console.log(`Connect to ${integration}`);
        
        // In production:
        // - Open OAuth flow
        // - Redirect to provider
        // - Handle callback
        // - Store tokens securely
        // - Update UI to show as connected
        
        showToast(`${integration} connected successfully!`, 'success');
    }, 1500);
};

// Disconnect Integration
window.disconnectIntegration = function(integration) {
    if (confirm(`Are you sure you want to disconnect ${integration}? This will stop all automated tasks using this integration.`)) {
        showToast(`Disconnecting ${integration}...`, 'info');
        
        setTimeout(() => {
            console.log(`Disconnect ${integration}`);
            
            // In production:
            // - Revoke OAuth tokens
            // - Clear stored credentials
            // - Stop any active syncs
            // - Update UI
            
            showToast(`${integration} disconnected`, 'success');
        }, 1000);
    }
};

// Configure Integration
window.configureIntegration = function(integration) {
    showToast(`Opening ${integration} settings...`, 'info');
    console.log(`Configure ${integration}`);
    
    // In production, open modal with:
    // - Sync settings
    // - Permissions
    // - Field mapping
    // - Webhook URLs
    // - Test connection
};

// Webhooks
window.createWebhook = function() {
    showToast('Opening webhook builder...', 'info');
    console.log('Create new webhook');
    
    // In production, open modal with:
    // - URL input
    // - Event selection (multi-select)
    // - Headers/Authentication
    // - Payload format
    // - Test endpoint button
};

window.editWebhook = function(webhookId) {
    showToast(`Editing webhook ${webhookId}...`, 'info');
    console.log(`Edit webhook ${webhookId}`);
    
    // In production:
    // - Load webhook details
    // - Show edit modal
    // - Allow changes
    // - Save updates
};

window.deleteWebhook = function(webhookId) {
    if (confirm('Are you sure you want to delete this webhook?')) {
        showToast('Webhook deleted', 'success');
        console.log(`Delete webhook ${webhookId}`);
        
        // In production:
        // - Call API to delete
        // - Remove from UI
    }
};

// OAuth Flow Handler
function handleOAuthCallback() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    
    if (code && state) {
        // Exchange code for tokens
        console.log('OAuth callback received:', { code, state });
        
        // In production:
        // POST /api/integrations/oauth/callback
        // { code, state, integration }
    }
}

// Test Integration Connection
window.testIntegrationConnection = function(integration) {
    showToast(`Testing ${integration} connection...`, 'info');
    
    setTimeout(() => {
        const success = Math.random() > 0.2; // 80% success rate
        
        if (success) {
            showToast(`${integration} connection successful!`, 'success');
        } else {
            showToast(`${integration} connection failed. Please check credentials.`, 'error');
        }
    }, 2000);
};

// ===================================
// SETTINGS FUNCTIONALITY
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    initSettings();
});

function initSettings() {
    initSettingsNavigation();
}

// Settings Navigation
function initSettingsNavigation() {
    const navItems = document.querySelectorAll('.settings-nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const section = this.dataset.section;
            switchSettingsSection(section);
        });
    });
}

function switchSettingsSection(section) {
    // Update nav items
    document.querySelectorAll('.settings-nav-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`[data-section="${section}"]`).classList.add('active');
    
    // Update content sections
    document.querySelectorAll('.settings-section').forEach(sec => {
        sec.classList.remove('active');
    });
    document.querySelector(`.settings-section[data-section="${section}"]`).classList.add('active');
}

// Team Management
window.inviteTeamMember = function() {
    const email = prompt('Enter email address to invite:');
    
    if (email && validateEmail(email)) {
        showToast(`Invitation sent to ${email}`, 'success');
        console.log(`Invite team member: ${email}`);
        
        // In production:
        // POST /api/team/invite
        // { email, role: 'member' }
    } else if (email) {
        showToast('Please enter a valid email address', 'error');
    }
};

window.removeTeamMember = function(memberId) {
    if (confirm('Are you sure you want to remove this team member?')) {
        showToast('Team member removed', 'success');
        console.log(`Remove team member: ${memberId}`);
        
        // In production:
        // DELETE /api/team/members/:id
    }
};

window.resendInvite = function(email) {
    showToast(`Invitation resent to ${email}`, 'success');
    console.log(`Resend invite to: ${email}`);
    
    // In production:
    // POST /api/team/invite/resend
    // { email }
};

window.cancelInvite = function(email) {
    if (confirm('Cancel this invitation?')) {
        showToast('Invitation cancelled', 'success');
        console.log(`Cancel invite: ${email}`);
        
        // In production:
        // DELETE /api/team/invites/:id
    }
};

// Security
window.revokeSession = function(sessionId) {
    if (confirm('Revoke this session? The device will be logged out.')) {
        showToast('Session revoked', 'success');
        console.log(`Revoke session: ${sessionId}`);
        
        // In production:
        // DELETE /api/auth/sessions/:id
    }
};

// Data Export
window.exportAllData = function() {
    if (confirm('Export all your data? This may take a few minutes.')) {
        showToast('Preparing data export...', 'info');
        
        setTimeout(() => {
            showToast('Export ready! Download started.', 'success');
            console.log('Export all data');
            
            // In production:
            // POST /api/account/export
            // Returns ZIP with all data
        }, 2000);
    }
};

// Account Deletion
window.deleteAccount = function() {
    const confirmation = prompt('This action is permanent. Type "DELETE" to confirm:');
    
    if (confirmation === 'DELETE') {
        showToast('Account deletion initiated...', 'info');
        
        setTimeout(() => {
            console.log('Delete account');
            
            // In production:
            // POST /api/account/delete
            // { confirmation: true }
            // Logout user
            // Redirect to goodbye page
            
            alert('Account deleted. Redirecting...');
        }, 1500);
    } else if (confirmation) {
        showToast('Account not deleted', 'info');
    }
};

// Form Validation Helper (already defined above, but included for completeness)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}