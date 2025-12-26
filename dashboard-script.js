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

// ===================================
// SOCIAL MEDIA MODALS
// ===================================

// Create Post Modal
window.openCreatePostModal = function() {
    document.getElementById('createPostModal').classList.add('active');
    
    // Set default date/time
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    document.getElementById('scheduleDate').value = tomorrow.toISOString().split('T')[0];
    document.getElementById('scheduleTime').value = '10:00';
};

window.closeCreatePostModal = function() {
    document.getElementById('createPostModal').classList.remove('active');
    resetCreatePostForm();
};

function resetCreatePostForm() {
    document.getElementById('postContent').value = '';
    document.querySelectorAll('input[name="platform"]').forEach(cb => {
        cb.checked = cb.value === 'linkedin';
    });
    document.querySelectorAll('input[name="schedule"]')[0].checked = true;
    document.getElementById('scheduleDatetime').style.display = 'none';
    updateCharCount();
}

// Character Counter
document.addEventListener('DOMContentLoaded', function() {
    const postContent = document.getElementById('postContent');
    if (postContent) {
        postContent.addEventListener('input', updateCharCount);
    }
    
    // Schedule radio buttons
    const scheduleRadios = document.querySelectorAll('input[name="schedule"]');
    scheduleRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            const datetime = document.getElementById('scheduleDatetime');
            if (this.value === 'schedule') {
                datetime.style.display = 'block';
            } else {
                datetime.style.display = 'none';
            }
        });
    });
    
    // Media upload click
    const uploadArea = document.querySelector('.media-upload-area');
    if (uploadArea) {
        uploadArea.addEventListener('click', function() {
            document.getElementById('mediaUpload').click();
        });
    }
    
    // Bulk upload click
    const bulkUploadArea = document.querySelector('.bulk-upload-area');
    if (bulkUploadArea) {
        bulkUploadArea.addEventListener('click', function(e) {
            if (e.target.tagName !== 'BUTTON') {
                document.getElementById('bulkCsvUpload').click();
            }
        });
    }
    
    // CSV file upload
    const csvUpload = document.getElementById('bulkCsvUpload');
    if (csvUpload) {
        csvUpload.addEventListener('change', handleCsvUpload);
    }
});

function updateCharCount() {
    const content = document.getElementById('postContent');
    const count = document.getElementById('charCount');
    const limit = document.getElementById('charLimit');
    
    if (content && count) {
        const length = content.value.length;
        count.textContent = length;
        
        // Get selected platforms
        const platforms = Array.from(document.querySelectorAll('input[name="platform"]:checked'))
            .map(cb => cb.value);
        
        // Update limit based on platform
        let maxLength = 3000; // LinkedIn default
        if (platforms.includes('twitter') && !platforms.includes('linkedin')) {
            maxLength = 280;
        }
        
        limit.textContent = maxLength;
        
        if (length > maxLength) {
            count.style.color = 'var(--error)';
        } else {
            count.style.color = 'var(--text-muted)';
        }
    }
}

// Save Draft
window.saveDraftPost = function() {
    const content = document.getElementById('postContent').value;
    const platforms = Array.from(document.querySelectorAll('input[name="platform"]:checked'))
        .map(cb => cb.value);
    
    if (!content.trim()) {
        showToast('Please enter post content', 'error');
        return;
    }
    
    if (platforms.length === 0) {
        showToast('Please select at least one platform', 'error');
        return;
    }
    
    showToast('Draft saved successfully!', 'success');
    console.log('Save draft:', { content, platforms });
    closeCreatePostModal();
};

// Publish Post
window.publishPost = function() {
    const content = document.getElementById('postContent').value;
    const platforms = Array.from(document.querySelectorAll('input[name="platform"]:checked'))
        .map(cb => cb.value);
    const scheduleType = document.querySelector('input[name="schedule"]:checked').value;
    
    if (!content.trim()) {
        showToast('Please enter post content', 'error');
        return;
    }
    
    if (platforms.length === 0) {
        showToast('Please select at least one platform', 'error');
        return;
    }
    
    let postData = {
        content,
        platforms
    };
    
    if (scheduleType === 'schedule') {
        const date = document.getElementById('scheduleDate').value;
        const time = document.getElementById('scheduleTime').value;
        postData.scheduledFor = `${date}T${time}:00`;
    } else {
        postData.publishNow = true;
    }
    
    showToast('Post scheduled successfully!', 'success');
    console.log('Schedule post:', postData);
    
    closeCreatePostModal();
    
    // In production:
    // POST /api/social-media/posts
    // { content, platforms, scheduledFor }
};

// Bulk Upload Modal
window.openBulkUploadModal = function() {
    document.getElementById('bulkUploadModal').classList.add('active');
};

window.closeBulkUploadModal = function() {
    document.getElementById('bulkUploadModal').classList.remove('active');
    resetBulkUploadForm();
};

function resetBulkUploadForm() {
    document.getElementById('bulkCsvUpload').value = '';
    document.getElementById('uploadPreview').style.display = 'none';
    document.getElementById('uploadBulkBtn').disabled = true;
}

// Download Template
window.downloadTemplate = function() {
    const csvContent = `platform,content,date,time
linkedin,"Excited to share our Q4 insights! 🚀",2024-12-27,10:00
twitter,"Hot take: AI automation is NOW, not the future 🤯",2024-12-27,14:00
instagram,"Behind the scenes at Bashua HQ ✨ #TechStartup",2024-12-27,17:00
linkedin,"How we helped clients save 20+ hours/week with AI",2024-12-28,09:00`;
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'social-media-bulk-upload-template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    
    showToast('Template downloaded!', 'success');
};

// Handle CSV Upload
function handleCsvUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    if (!file.name.endsWith('.csv')) {
        showToast('Please upload a CSV file', 'error');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const csv = e.target.result;
        const posts = parseCSV(csv);
        
        if (posts.length === 0) {
            showToast('No valid posts found in CSV', 'error');
            return;
        }
        
        displayUploadPreview(posts);
    };
    reader.readAsText(file);
}

function parseCSV(csv) {
    const lines = csv.split('\n').filter(line => line.trim());
    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    
    const posts = [];
    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',');
        const post = {};
        headers.forEach((header, index) => {
            post[header] = values[index] ? values[index].trim().replace(/^"|"$/g, '') : '';
        });
        
        if (post.platform && post.content) {
            posts.push(post);
        }
    }
    
    return posts;
}

function displayUploadPreview(posts) {
    const preview = document.getElementById('uploadPreview');
    preview.style.display = 'block';
    
    // Count by platform
    const counts = {
        total: posts.length,
        linkedin: posts.filter(p => p.platform.toLowerCase().includes('linkedin')).length,
        twitter: posts.filter(p => p.platform.toLowerCase().includes('twitter')).length,
        instagram: posts.filter(p => p.platform.toLowerCase().includes('instagram')).length
    };
    
    document.getElementById('totalPosts').textContent = counts.total;
    document.getElementById('linkedinPosts').textContent = counts.linkedin;
    document.getElementById('twitterPosts').textContent = counts.twitter;
    document.getElementById('instagramPosts').textContent = counts.instagram;
    
    document.getElementById('uploadBulkBtn').disabled = false;
    
    // Store posts for upload
    window.bulkPostsData = posts;
}

// Upload Bulk Posts
window.uploadBulkPosts = function() {
    if (!window.bulkPostsData || window.bulkPostsData.length === 0) {
        showToast('No posts to upload', 'error');
        return;
    }
    
    showToast(`Uploading ${window.bulkPostsData.length} posts...`, 'info');
    
    setTimeout(() => {
        showToast('Bulk upload successful!', 'success');
        console.log('Bulk upload:', window.bulkPostsData);
        closeBulkUploadModal();
        
        // In production:
        // POST /api/social-media/posts/bulk
        // { posts: window.bulkPostsData }
    }, 1500);
};

// Update event listeners for buttons
document.addEventListener('DOMContentLoaded', function() {
    const createBtn = document.getElementById('createPostBtn');
    if (createBtn) {
        createBtn.addEventListener('click', openCreatePostModal);
    }
    
    const bulkBtn = document.getElementById('bulkUploadBtn');
    if (bulkBtn) {
        bulkBtn.addEventListener('click', openBulkUploadModal);
    }
});

// ===================================
// QUEUE POST ACTIONS
// ===================================

// Dummy post data store
const queuePosts = {
    1: {
        id: 1,
        platforms: ['linkedin', 'twitter'],
        content: '🚀 Excited to share our Q4 growth insights! We\'ve helped 50+ businesses automate their operations and save 20+ hours per week. Here\'s what we learned about scaling with AI...',
        scheduledFor: '2024-12-26T14:00:00',
        status: 'scheduled'
    },
    2: {
        id: 2,
        platforms: ['instagram'],
        content: 'Behind the scenes at Bashua HQ 💼✨ Our team working hard to build the future of operations automation. Swipe to see our development process! #TechStartup #AIInnovation',
        scheduledFor: '2024-12-26T17:30:00',
        status: 'scheduled'
    },
    3: {
        id: 3,
        platforms: ['linkedin'],
        content: `Here's how AI automation transformed our client's recruitment process:

✅ 40% faster hiring
✅ 60% cost reduction
✅ Better candidate quality
✅ Happier hiring managers

Want to see how we can optimize your operations? Book a demo 👇`,
        scheduledFor: '2024-12-27T10:00:00',
        status: 'scheduled'
    },
    4: {
        id: 4,
        platforms: ['twitter'],
        content: `Hot take: Manual operations in 2024 is like using a typewriter instead of a computer 🤯

AI automation isn't the future—it's NOW.

What operational task are you still doing manually? 👇`,
        scheduledFor: '2024-12-27T15:00:00',
        status: 'scheduled'
    },
    5: {
        id: 5,
        platforms: ['linkedin', 'twitter'],
        content: '📊 New research: Companies using AI automation see an average ROI of 300% in the first year.\n\nBut here\'s what they don\'t tell you about implementing AI systems... [Thread 🧵]',
        scheduledFor: '2024-12-30T09:00:00',
        status: 'scheduled'
    },
    6: {
        id: 6,
        platforms: ['instagram'],
        content: `Client spotlight 🌟 

Meet Sarah, who went from spending 15 hours/week on admin tasks to zero with our AI systems.

Now she focuses on what she does best: growing her business.

Your success story could be next 💪 #ClientWins #Automation`,
        scheduledFor: '2025-01-01T16:00:00',
        status: 'scheduled'
    }
};

let currentEditingPostId = null;
let currentDeletingPostId = null;

// Edit Post
window.editPost = function(postId) {
    const post = queuePosts[postId];
    if (!post) {
        showToast('Post not found', 'error');
        return;
    }
    
    currentEditingPostId = postId;
    
    // Populate modal with post data
    document.getElementById('editPostContent').value = post.content;
    
    // Set platforms
    document.querySelectorAll('input[name="edit-platform"]').forEach(checkbox => {
        checkbox.checked = post.platforms.includes(checkbox.value);
    });
    
    // Set schedule
    const scheduledDate = new Date(post.scheduledFor);
    document.getElementById('editScheduleDate').value = scheduledDate.toISOString().split('T')[0];
    document.getElementById('editScheduleTime').value = scheduledDate.toTimeString().slice(0, 5);
    
    // Update character count
    updateEditCharCount();
    
    // Open modal
    document.getElementById('editPostModal').classList.add('active');
};

window.closeEditPostModal = function() {
    document.getElementById('editPostModal').classList.remove('active');
    currentEditingPostId = null;
};

window.saveEditedPost = function() {
    if (!currentEditingPostId) return;
    
    const content = document.getElementById('editPostContent').value;
    const platforms = Array.from(document.querySelectorAll('input[name="edit-platform"]:checked'))
        .map(cb => cb.value);
    const date = document.getElementById('editScheduleDate').value;
    const time = document.getElementById('editScheduleTime').value;
    
    if (!content.trim()) {
        showToast('Please enter post content', 'error');
        return;
    }
    
    if (platforms.length === 0) {
        showToast('Please select at least one platform', 'error');
        return;
    }
    
    // Update post data
    queuePosts[currentEditingPostId] = {
        ...queuePosts[currentEditingPostId],
        content,
        platforms,
        scheduledFor: `${date}T${time}:00`
    };
    
    showToast('Post updated successfully!', 'success');
    console.log('Updated post:', queuePosts[currentEditingPostId]);
    
    closeEditPostModal();
    
    // In production:
    // PATCH /api/social-media/posts/:id
    // { content, platforms, scheduledFor }
};

// Character counter for edit modal
document.addEventListener('DOMContentLoaded', function() {
    const editContent = document.getElementById('editPostContent');
    if (editContent) {
        editContent.addEventListener('input', updateEditCharCount);
    }
});

function updateEditCharCount() {
    const content = document.getElementById('editPostContent');
    const count = document.getElementById('editCharCount');
    const limit = document.getElementById('editCharLimit');
    
    if (content && count) {
        const length = content.value.length;
        count.textContent = length;
        
        // Get selected platforms
        const platforms = Array.from(document.querySelectorAll('input[name="edit-platform"]:checked'))
            .map(cb => cb.value);
        
        // Update limit based on platform
        let maxLength = 3000;
        if (platforms.includes('twitter') && !platforms.includes('linkedin')) {
            maxLength = 280;
        }
        
        limit.textContent = maxLength;
        
        if (length > maxLength) {
            count.style.color = 'var(--error)';
        } else {
            count.style.color = 'var(--text-muted)';
        }
    }
}

// Preview Post
window.previewPost = function(postId) {
    const post = queuePosts[postId];
    if (!post) {
        showToast('Post not found', 'error');
        return;
    }
    
    currentEditingPostId = postId; // Store for edit from preview
    
    // Generate previews for each platform
    const previewContainer = document.getElementById('previewPlatforms');
    previewContainer.innerHTML = '';
    
    post.platforms.forEach(platform => {
        const preview = createPlatformPreview(platform, post);
        previewContainer.appendChild(preview);
    });
    
    // Open modal
    document.getElementById('previewPostModal').classList.add('active');
};

function createPlatformPreview(platform, post) {
    const div = document.createElement('div');
    div.className = 'platform-preview';
    
    const platformNames = {
        linkedin: 'LinkedIn',
        twitter: 'Twitter',
        instagram: 'Instagram'
    };
    
    const scheduledDate = new Date(post.scheduledFor);
    const formattedDate = scheduledDate.toLocaleString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    // Calculate character count
    const charCount = post.content.length;
    let maxChars = 3000;
    if (platform === 'twitter') maxChars = 280;
    else if (platform === 'instagram') maxChars = 2200;
    
    const charWarning = charCount > maxChars ? 
        `<span style="color: var(--error);">${charCount} / ${maxChars}</span>` :
        `${charCount} / ${maxChars}`;
    
    div.innerHTML = `
        <div class="platform-preview-header">
            <div class="platform-preview-icon ${platform}">
                ${getPlatformIcon(platform)}
            </div>
            <div class="platform-preview-name">${platformNames[platform]}</div>
        </div>
        <div class="platform-preview-content">${escapeHtml(post.content)}</div>
        <div class="platform-preview-meta">
            <div class="preview-meta-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                ${formattedDate}
            </div>
            <div class="preview-meta-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 20h9"></path>
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                </svg>
                ${charWarning} characters
            </div>
        </div>
    `;
    
    return div;
}

function getPlatformIcon(platform) {
    const icons = {
        linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286z"></path></svg>',
        twitter: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>',
        instagram: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z"></path></svg>'
    };
    return icons[platform] || '';
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

window.closePreviewPostModal = function() {
    document.getElementById('previewPostModal').classList.remove('active');
};

window.editFromPreview = function() {
    closePreviewPostModal();
    if (currentEditingPostId) {
        editPost(currentEditingPostId);
    }
};

// Delete Post
window.deletePost = function(postId) {
    currentDeletingPostId = postId;
    document.getElementById('deletePostModal').classList.add('active');
};

window.closeDeletePostModal = function() {
    document.getElementById('deletePostModal').classList.remove('active');
    currentDeletingPostId = null;
};

window.confirmDeletePost = function() {
    if (!currentDeletingPostId) return;
    
    // Remove from data store
    delete queuePosts[currentDeletingPostId];
    
    showToast('Post deleted successfully', 'success');
    console.log('Deleted post:', currentDeletingPostId);
    
    closeDeletePostModal();
    
    // In production:
    // DELETE /api/social-media/posts/:id
    
    // Optionally refresh the queue view
    // refreshQueueView();
};

// ===================================
// CONTENT LIBRARY FUNCTIONALITY
// ===================================

// Dummy content library data
const contentLibrary = [
    {
        id: 1,
        type: 'linkedin',
        title: 'The Future of AI Automation in Business',
        content: `🚀 The future of business operations is here, and it's powered by AI.

Here's what I've learned after implementing AI automation for 50+ companies:

1️⃣ Time Savings Are Real
Our clients save an average of 20+ hours per week on repetitive tasks. That's an entire day back in your week.

2️⃣ Quality Actually Improves
Contrary to popular belief, automation doesn't mean sacrificing quality. Our systems maintain 99.8% accuracy while handling 10x the volume.

3️⃣ Your Team Will Thank You
When you remove soul-crushing busy work, your team can focus on what they do best: strategy, creativity, and relationship-building.

4️⃣ ROI Comes Faster Than Expected
Most companies see positive ROI within 3 months. Some in as little as 4 weeks.

The question isn't whether to automate—it's what to automate first.

What operational task is taking up most of your time? 👇

#AIAutomation #BusinessOperations #Productivity`,
        createdAt: '2024-12-20T10:30:00',
        tone: 'Professional'
    },
    {
        id: 2,
        type: 'email',
        title: 'Welcome Sequence - Email 1',
        content: `Subject: Welcome to Bashua Operations! Here's what's next...

Hi {{first_name}},

Welcome aboard! 🎉

I'm Toni, founder of Bashua Operations, and I'm thrilled you've joined us.

Over the next few days, I'll be sending you some valuable insights on how to transform your operations with AI automation.

But first, I want to understand your biggest challenges.

Which of these sounds most like you?

→ "I'm drowning in manual tasks"
→ "My team is overwhelmed"
→ "We're growing but can't keep up"
→ "I want to scale without hiring"

Simply reply to this email and let me know. I read every response personally.

To your success,
Toni Bashua
Founder, Bashua Operations

P.S. Check your inbox tomorrow for our guide: "5 Operations You Can Automate Today"`,
        createdAt: '2024-12-18T14:20:00',
        tone: 'Friendly'
    },
    {
        id: 3,
        type: 'blog',
        title: 'Complete Guide to Operations Automation',
        content: `# The Complete Guide to Operations Automation in 2024

## Introduction

Operations automation isn't just a buzzword—it's the competitive advantage that separates thriving businesses from those struggling to keep up.

In this comprehensive guide, I'll walk you through everything you need to know about automating your business operations, from identifying opportunities to measuring ROI.

## What is Operations Automation?

Operations automation uses technology to perform repetitive tasks without human intervention. But it's more than just setting up some software—it's about fundamentally rethinking how work gets done.

## The 5 Pillars of Successful Automation

### 1. Process Mapping
Before you automate anything, you need to understand your current processes...

### 2. Tool Selection
The right tools make all the difference...

### 3. Implementation Strategy
How you roll out automation matters...

### 4. Team Training
Your team needs to embrace the change...

### 5. Continuous Optimization
Automation isn't "set it and forget it"...

## Conclusion

The businesses that thrive in the next decade will be those that embrace intelligent automation today. The question is: will you be one of them?`,
        createdAt: '2024-12-15T09:00:00',
        tone: 'Educational'
    },
    {
        id: 4,
        type: 'twitter',
        title: 'AI Automation Thread',
        content: `🧵 Thread: The 5 operations you should automate FIRST in your business

Most founders waste time automating the wrong things.

Here's the priority order that actually works:

1/6`,
        createdAt: '2024-12-22T16:45:00',
        tone: 'Casual'
    },
    {
        id: 5,
        type: 'ad',
        title: 'LinkedIn Ad - Free Audit Offer',
        content: `⚡ Still Doing Manual Operations in 2024?

We'll show you exactly which tasks you can automate to save 20+ hours per week.

→ Free Operations Audit (Worth £500)
→ Custom Automation Roadmap
→ ROI Calculator
→ Zero commitment required

50 businesses have already claimed their audit this month.

Only 10 spots left.

👉 Book your free audit now

[Get Your Free Audit]

*Limited to UK-based businesses with 10+ employees`,
        createdAt: '2024-12-19T11:15:00',
        tone: 'Persuasive'
    },
    {
        id: 6,
        type: 'linkedin',
        title: 'Client Success Story - Recruitment Agency',
        content: `📊 Case Study: How a recruitment agency cut hiring time by 40% with AI

Client: UK-based recruitment agency (confidential)
Challenge: Manual CV screening taking 15+ hours per week
Solution: Our AI-powered CV analysis system

Results after 90 days:
✅ 40% faster time-to-hire
✅ 60% reduction in screening costs
✅ 85% improvement in candidate quality scores
✅ Team morale significantly improved

The best part? Their recruiters now spend time on what they do best: building relationships and closing placements.

Not processing endless spreadsheets.

Want similar results for your recruitment process?

DM me "CASE STUDY" and I'll send you the full breakdown.

#Recruitment #AIAutomation #CaseStudy`,
        createdAt: '2024-12-21T13:30:00',
        tone: 'Professional'
    },
    {
        id: 7,
        type: 'email',
        title: 'Re-engagement Campaign - Email 3',
        content: `Subject: We miss you! Here's 20% off to come back...

Hi {{first_name}},

I noticed you haven't logged into Bashua Operations in a while.

Did something come up? Or are we missing something you need?

I'd love to hear your honest feedback.

But I also want to make it easy for you to give us another shot:

→ 20% off your next 3 months
→ Free 1-on-1 onboarding session
→ Priority support for 30 days

No strings attached. Just click below to reactivate:

[Claim My 20% Discount]

Not interested? I understand. You can unsubscribe at the bottom of this email.

Best regards,
Toni

P.S. This offer expires in 48 hours`,
        createdAt: '2024-12-17T10:00:00',
        tone: 'Friendly'
    },
    {
        id: 8,
        type: 'twitter',
        title: 'Hot Take - Manual Operations',
        content: `Hot take: 

Manual operations in 2024 is like using a typewriter instead of a computer.

Sure, you CAN do it.

But why would you?

AI automation isn't the future.

It's NOW. 🤯`,
        createdAt: '2024-12-23T15:20:00',
        tone: 'Bold'
    }
];

let currentViewingContent = null;
let filteredLibrary = [...contentLibrary];

// Open Content Library
window.openContentLibrary = function() {
    renderLibrary();
    document.getElementById('contentLibraryModal').classList.add('active');
};

window.closeContentLibrary = function() {
    document.getElementById('contentLibraryModal').classList.remove('active');
};

// Render Library Grid
function renderLibrary() {
    const grid = document.getElementById('libraryGrid');
    const empty = document.getElementById('libraryEmpty');
    
    if (filteredLibrary.length === 0) {
        grid.style.display = 'none';
        empty.style.display = 'block';
        return;
    }
    
    grid.style.display = 'grid';
    empty.style.display = 'none';
    
    grid.innerHTML = filteredLibrary.map(item => createLibraryItem(item)).join('');
}

function createLibraryItem(item) {
    const date = new Date(item.createdAt);
    const formattedDate = date.toLocaleDateString('en-GB', { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric' 
    });
    
    const preview = item.content.substring(0, 150) + (item.content.length > 150 ? '...' : '');
    
    const typeNames = {
        linkedin: 'LinkedIn',
        email: 'Email',
        blog: 'Blog',
        twitter: 'Twitter',
        ad: 'Ad Copy'
    };
    
    return `
        <div class="library-item" onclick="viewContent(${item.id})">
            <div class="library-item-header">
                <div>
                    <div class="library-item-title">${escapeHtml(item.title)}</div>
                </div>
                <span class="library-item-type ${item.type}">${typeNames[item.type]}</span>
            </div>
            <div class="library-item-preview">${escapeHtml(preview)}</div>
            <div class="library-item-footer">
                <div class="library-item-date">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    ${formattedDate}
                </div>
                <div class="library-item-actions">
                    <button class="library-action-btn" onclick="event.stopPropagation(); duplicateContent(${item.id})" title="Duplicate">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                    </button>
                    <button class="library-action-btn delete" onclick="event.stopPropagation(); deleteContent(${item.id})" title="Delete">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    `;
}

// View Content
window.viewContent = function(contentId) {
    const content = contentLibrary.find(item => item.id === contentId);
    if (!content) return;
    
    currentViewingContent = content;
    
    const typeNames = {
        linkedin: 'LinkedIn Post',
        email: 'Email',
        blog: 'Blog Post',
        twitter: 'Twitter/X Post',
        ad: 'Ad Copy'
    };
    
    const date = new Date(content.createdAt);
    const formattedDate = date.toLocaleDateString('en-GB', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
    });
    
    document.getElementById('viewContentTitle').textContent = content.title;
    document.getElementById('viewContentType').textContent = typeNames[content.type];
    document.getElementById('viewContentType').className = `content-type-badge ${content.type}`;
    document.getElementById('viewContentDate').textContent = `Created ${formattedDate}`;
    document.getElementById('viewContentBody').textContent = content.content;
    
    document.getElementById('viewContentModal').classList.add('active');
};

window.closeViewContent = function() {
    document.getElementById('viewContentModal').classList.remove('active');
    currentViewingContent = null;
};

// Copy to Clipboard
window.copyContentToClipboard = function() {
    if (!currentViewingContent) return;
    
    navigator.clipboard.writeText(currentViewingContent.content).then(() => {
        showToast('Content copied to clipboard!', 'success');
    }).catch(() => {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = currentViewingContent.content;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast('Content copied to clipboard!', 'success');
    });
};

// Edit Content from View
window.editContentFromView = function() {
    if (!currentViewingContent) return;
    
    // Close view modal
    closeViewContent();
    closeContentLibrary();
    
    // Populate content creator form
    // In a real implementation, you'd populate the form fields here
    showToast('Edit functionality - populate creator form with content', 'info');
    
    console.log('Edit content:', currentViewingContent);
};

// Duplicate Content
window.duplicateContent = function(contentId) {
    const content = contentLibrary.find(item => item.id === contentId);
    if (!content) return;
    
    const newContent = {
        ...content,
        id: Math.max(...contentLibrary.map(c => c.id)) + 1,
        title: `${content.title} (Copy)`,
        createdAt: new Date().toISOString()
    };
    
    contentLibrary.unshift(newContent);
    filteredLibrary = [...contentLibrary];
    
    renderLibrary();
    showToast('Content duplicated successfully!', 'success');
    
    console.log('Duplicated content:', newContent);
};

// Delete Content
window.deleteContent = function(contentId) {
    if (!confirm('Are you sure you want to delete this content? This action cannot be undone.')) {
        return;
    }
    
    const index = contentLibrary.findIndex(item => item.id === contentId);
    if (index > -1) {
        contentLibrary.splice(index, 1);
        filteredLibrary = [...contentLibrary];
        renderLibrary();
        showToast('Content deleted successfully', 'success');
    }
};

// Filter Library
document.addEventListener('DOMContentLoaded', function() {
    const typeFilter = document.getElementById('libraryTypeFilter');
    const sortFilter = document.getElementById('librarySortFilter');
    const searchInput = document.getElementById('librarySearch');
    
    if (typeFilter) {
        typeFilter.addEventListener('change', filterLibrary);
    }
    
    if (sortFilter) {
        sortFilter.addEventListener('change', filterLibrary);
    }
    
    if (searchInput) {
        searchInput.addEventListener('input', filterLibrary);
    }
    
    // View Library button
    const viewLibraryBtn = document.getElementById('viewLibraryBtn');
    if (viewLibraryBtn) {
        viewLibraryBtn.addEventListener('click', openContentLibrary);
    }
});

function filterLibrary() {
    const typeFilter = document.getElementById('libraryTypeFilter').value;
    const sortFilter = document.getElementById('librarySortFilter').value;
    const searchTerm = document.getElementById('librarySearch').value.toLowerCase();
    
    // Filter by type
    filteredLibrary = typeFilter === 'all' 
        ? [...contentLibrary]
        : contentLibrary.filter(item => item.type === typeFilter);
    
    // Filter by search
    if (searchTerm) {
        filteredLibrary = filteredLibrary.filter(item => 
            item.title.toLowerCase().includes(searchTerm) ||
            item.content.toLowerCase().includes(searchTerm)
        );
    }
    
    // Sort
    if (sortFilter === 'recent') {
        filteredLibrary.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortFilter === 'oldest') {
        filteredLibrary.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortFilter === 'title') {
        filteredLibrary.sort((a, b) => a.title.localeCompare(b.title));
    }
    
    renderLibrary();
}

// ===================================
// EMAIL CAMPAIGNS FUNCTIONALITY
// ===================================

// Dummy campaign data
const emailCampaigns = {
    1: {
        id: 1,
        name: 'Q1 Product Launch',
        subject: '🎉 Introducing Our Biggest Update Yet',
        content: `Hi {{first_name}},

We're excited to announce our Q1 product launch!

Here's what's new:
• AI-powered content generation
• Advanced analytics dashboard
• Multi-platform scheduling
• Team collaboration tools

Get started today and transform your operations.

Best regards,
Toni Bashua
Bashua Operations`,
        status: 'active',
        recipients: 2847,
        sent: 2847,
        opened: 712,
        clicked: 142,
        conversions: 34,
        startedAt: '2024-12-10T09:00:00'
    },
    2: {
        id: 2,
        name: 'Weekly Newsletter',
        subject: '📰 This Week in AI Automation',
        content: `Weekly insights and tips for optimizing your business operations.`,
        status: 'active',
        recipients: 4192,
        sent: 4192,
        opened: 1089,
        clicked: 209,
        conversions: 63,
        startedAt: '2024-12-01T10:00:00'
    },
    3: {
        id: 3,
        name: 'Holiday Sale Announcement',
        subject: '🎄 Holiday Sale: Up to 50% Off Everything!',
        content: `Don't miss our biggest sale of the year!\n\nUse code HOLIDAY50 at checkout.`,
        status: 'draft',
        recipients: 0,
        editedAt: '2024-12-26T10:30:00'
    },
    4: {
        id: 4,
        name: 'Year-End Review',
        subject: '2024: A Year of Innovation',
        content: `Thank you for an amazing year! Here's what we accomplished together...`,
        status: 'scheduled',
        recipients: 5421,
        scheduledFor: '2024-12-31T10:00:00'
    },
    5: {
        id: 5,
        name: 'November Newsletter',
        subject: '📊 November Performance Report',
        content: `Your monthly performance summary is here!`,
        status: 'completed',
        recipients: 3891,
        sent: 3891,
        opened: 934,
        clicked: 187,
        conversions: 74,
        sentAt: '2024-11-28T09:00:00'
    }
};

let currentCampaignId = null;

// View Campaign Report
window.viewEmailReport = function(campaignId) {
    const campaign = emailCampaigns[campaignId];
    if (!campaign) return;
    
    currentCampaignId = campaignId;
    
    // Update modal content
    document.getElementById('reportCampaignName').textContent = campaign.name;
    document.getElementById('reportCampaignStatus').textContent = campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1);
    document.getElementById('reportCampaignStatus').className = `campaign-status-badge ${campaign.status}`;
    
    const date = new Date(campaign.startedAt || campaign.sentAt);
    document.getElementById('reportCampaignDate').textContent = `Started ${date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}`;
    
    // Update stats
    document.getElementById('reportSent').textContent = campaign.sent.toLocaleString();
    document.getElementById('reportOpened').textContent = `${((campaign.opened / campaign.sent) * 100).toFixed(1)}%`;
    document.getElementById('reportClicked').textContent = `${((campaign.clicked / campaign.sent) * 100).toFixed(1)}%`;
    document.getElementById('reportConversions').textContent = `${((campaign.conversions / campaign.sent) * 100).toFixed(1)}%`;
    
    // Render engagement chart
    renderEngagementChart();
    
    document.getElementById('campaignReportModal').classList.add('active');
};

window.closeCampaignReport = function() {
    document.getElementById('campaignReportModal').classList.remove('active');
    currentCampaignId = null;
};

function renderEngagementChart() {
    const canvas = document.getElementById('engagementChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.clearRect(0, 0, width, height);
    
    // Dummy engagement data over time
    const data = [20, 45, 68, 82, 91, 95, 97, 98, 99, 100];
    const max = 100;
    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    
    // Draw grid
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
        const y = padding + (chartHeight / 4) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
    }
    
    // Draw line
    ctx.strokeStyle = '#8b5cf6';
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
    
    // Fill area
    const gradient = ctx.createLinearGradient(0, padding, 0, height - padding);
    gradient.addColorStop(0, 'rgba(139, 92, 246, 0.2)');
    gradient.addColorStop(1, 'rgba(139, 92, 246, 0)');
    
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
}

// Export Campaign Report
window.exportCampaignReport = function() {
    showToast('Generating PDF report...', 'info');
    
    setTimeout(() => {
        showToast('Report downloaded successfully!', 'success');
        console.log('Export campaign report:', currentCampaignId);
        // In production: generate PDF with charts and metrics
    }, 1500);
};

// Duplicate Campaign
window.duplicateCampaign = function(campaignId) {
    const campaign = emailCampaigns[campaignId];
    if (!campaign) return;
    
    const newId = Math.max(...Object.keys(emailCampaigns).map(Number)) + 1;
    emailCampaigns[newId] = {
        ...campaign,
        id: newId,
        name: `${campaign.name} (Copy)`,
        status: 'draft',
        recipients: 0,
        sent: 0,
        opened: 0,
        clicked: 0,
        conversions: 0,
        editedAt: new Date().toISOString()
    };
    
    showToast('Campaign duplicated successfully!', 'success');
    console.log('Duplicated campaign:', emailCampaigns[newId]);
    
    // In production: POST /api/email-campaigns/:id/duplicate
};

// Pause Campaign
window.pauseEmailCampaign = function(campaignId) {
    if (!confirm('Pause this campaign? No more emails will be sent.')) return;
    
    const campaign = emailCampaigns[campaignId];
    if (campaign) {
        campaign.status = 'paused';
        showToast('Campaign paused', 'success');
        console.log('Paused campaign:', campaignId);
        // In production: POST /api/email-campaigns/:id/pause
    }
};

// Resume Campaign
window.resumeEmailCampaign = function(campaignId) {
    const campaign = emailCampaigns[campaignId];
    if (campaign) {
        campaign.status = 'active';
        showToast('Campaign resumed', 'success');
        console.log('Resumed campaign:', campaignId);
        // In production: POST /api/email-campaigns/:id/resume
    }
};

// Edit Campaign
window.editCampaign = function(campaignId) {
    const campaign = emailCampaigns[campaignId];
    if (!campaign) return;
    
    currentCampaignId = campaignId;
    
    // Populate form
    document.getElementById('editCampaignName').value = campaign.name;
    document.getElementById('editCampaignSubject').value = campaign.subject;
    document.getElementById('editCampaignContent').value = campaign.content;
    
    if (campaign.scheduledFor) {
        const date = new Date(campaign.scheduledFor);
        document.getElementById('editCampaignDate').value = date.toISOString().split('T')[0];
        document.getElementById('editCampaignTime').value = date.toTimeString().slice(0, 5);
    }
    
    document.getElementById('editCampaignModal').classList.add('active');
};

window.closeEditCampaign = function() {
    document.getElementById('editCampaignModal').classList.remove('active');
    currentCampaignId = null;
};

window.saveCampaignEdit = function() {
    if (!currentCampaignId) return;
    
    const campaign = emailCampaigns[currentCampaignId];
    if (!campaign) return;
    
    campaign.name = document.getElementById('editCampaignName').value;
    campaign.subject = document.getElementById('editCampaignSubject').value;
    campaign.content = document.getElementById('editCampaignContent').value;
    
    const date = document.getElementById('editCampaignDate').value;
    const time = document.getElementById('editCampaignTime').value;
    if (date && time) {
        campaign.scheduledFor = `${date}T${time}:00`;
    }
    
    showToast('Campaign updated successfully!', 'success');
    console.log('Updated campaign:', campaign);
    closeEditCampaign();
    
    // In production: PATCH /api/email-campaigns/:id
};

// Preview Campaign
window.previewEmail = function(campaignId) {
    const campaign = emailCampaigns[campaignId];
    if (!campaign) return;
    
    currentCampaignId = campaignId;
    
    document.getElementById('previewFrom').textContent = 'Toni Bashua <toni@bashua.com>';
    document.getElementById('previewSubject').textContent = campaign.subject;
    document.getElementById('previewContent').textContent = campaign.content.replace(/{{first_name}}/g, 'John');
    
    document.getElementById('previewCampaignModal').classList.add('active');
};

window.closePreviewCampaign = function() {
    document.getElementById('previewCampaignModal').classList.remove('active');
};

// Send Test Email
window.sendTestEmail = function() {
    closePreviewCampaign();
    document.getElementById('sendTestModal').classList.add('active');
};

window.closeSendTest = function() {
    document.getElementById('sendTestModal').classList.remove('active');
    document.getElementById('testEmailAddress').value = '';
};

window.confirmSendTest = function() {
    const email = document.getElementById('testEmailAddress').value;
    
    if (!email) {
        showToast('Please enter an email address', 'error');
        return;
    }
    
    if (!validateEmail(email)) {
        showToast('Please enter a valid email address', 'error');
        return;
    }
    
    showToast(`Test email sent to ${email}!`, 'success');
    console.log('Send test email to:', email, 'Campaign:', currentCampaignId);
    closeSendTest();
    
    // In production: POST /api/email-campaigns/:id/send-test { email }
};

// Send Campaign Now
window.sendNowEmail = function(campaignId) {
    if (!confirm('Send this campaign now to all recipients?')) return;
    
    const campaign = emailCampaigns[campaignId];
    if (campaign) {
        campaign.status = 'active';
        showToast('Campaign sending now...', 'success');
        console.log('Send campaign now:', campaignId);
        // In production: POST /api/email-campaigns/:id/send
    }
};

// Cancel Scheduled Campaign
window.cancelScheduled = function(campaignId) {
    if (!confirm('Cancel this scheduled campaign? It will be moved to drafts.')) return;
    
    const campaign = emailCampaigns[campaignId];
    if (campaign) {
        campaign.status = 'draft';
        delete campaign.scheduledFor;
        showToast('Campaign moved to drafts', 'success');
        console.log('Cancelled scheduled campaign:', campaignId);
        // In production: POST /api/email-campaigns/:id/cancel
    }
};

// Helper function for email validation (if not already defined)
if (typeof validateEmail === 'undefined') {
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
}

// ===================================
// LEAD PIPELINE FUNCTIONALITY
// ===================================

// Add Lead Modal
window.openAddLead = function() {
    document.getElementById('addLeadModal').classList.add('active');
};

window.closeAddLead = function() {
    document.getElementById('addLeadModal').classList.remove('active');
    document.getElementById('addLeadForm').reset();
};

window.saveNewLead = function() {
    // Validate required fields
    const firstName = document.getElementById('leadFirstName').value.trim();
    const lastName = document.getElementById('leadLastName').value.trim();
    const email = document.getElementById('leadEmail').value.trim();
    const company = document.getElementById('leadCompany').value.trim();
    
    if (!firstName || !lastName || !email || !company) {
        showToast('Please fill in all required fields', 'error');
        return;
    }
    
    if (!validateEmail(email)) {
        showToast('Please enter a valid email address', 'error');
        return;
    }
    
    // Collect lead data
    const leadData = {
        firstName,
        lastName,
        email,
        phone: document.getElementById('leadPhone').value.trim(),
        company,
        title: document.getElementById('leadTitle').value.trim(),
        industry: document.getElementById('leadIndustry').value,
        source: document.getElementById('leadSource').value,
        value: document.getElementById('leadValue').value,
        stage: document.getElementById('leadStage').value,
        notes: document.getElementById('leadNotes').value.trim(),
        createdAt: new Date().toISOString()
    };
    
    showToast('Lead added successfully!', 'success');
    console.log('New lead:', leadData);
    
    closeAddLead();
    
    // In production:
    // POST /api/leads
    // { ...leadData }
    // Then refresh the pipeline view
};

// Import Leads Modal
let importedLeadsData = null;

window.openImportLeads = function() {
    document.getElementById('importLeadsModal').classList.add('active');
};

window.closeImportLeads = function() {
    document.getElementById('importLeadsModal').classList.remove('active');
    resetImportForm();
};

function resetImportForm() {
    document.getElementById('leadsFileUpload').value = '';
    document.getElementById('importLeadsPreview').style.display = 'none';
    document.getElementById('importLeadsBtn').disabled = true;
    importedLeadsData = null;
}

// Download Template
window.downloadLeadTemplate = function() {
    const csvContent = `first_name,last_name,email,phone,company,title,industry,source,value,notes
John,Smith,john.smith@example.com,+44 20 1234 5678,Acme Corp,CEO,technology,linkedin,50000,Interested in automation
Sarah,Johnson,sarah.j@techco.com,+44 20 9876 5432,TechCo Ltd,CTO,technology,referral,75000,Referred by existing client
Michael,Brown,m.brown@retailltd.com,+44 161 234 5678,Retail Ltd,Operations Manager,retail,website,25000,Downloaded whitepaper
Emma,Wilson,emma.w@finance.com,+44 131 987 6543,Finance Solutions,Director,finance,event,100000,Met at conference
David,Taylor,david.t@healthcare.org,+44 20 5555 1234,Healthcare Org,Head of IT,healthcare,cold-outreach,45000,Interested in demo`;
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lead-import-template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    
    showToast('Template downloaded!', 'success');
};

// Handle File Upload
document.addEventListener('DOMContentLoaded', function() {
    const fileUpload = document.getElementById('leadsFileUpload');
    if (fileUpload) {
        fileUpload.addEventListener('change', handleLeadsFileUpload);
    }
    
    // Drag and drop
    const uploadArea = document.getElementById('importUploadArea');
    if (uploadArea) {
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = 'var(--brown)';
            uploadArea.style.background = 'rgba(156, 123, 105, 0.05)';
        });
        
        uploadArea.addEventListener('dragleave', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = '';
            uploadArea.style.background = '';
        });
        
        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = '';
            uploadArea.style.background = '';
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                const file = files[0];
                if (file.name.endsWith('.csv')) {
                    processLeadsFile(file);
                } else {
                    showToast('Please upload a CSV file', 'error');
                }
            }
        });
    }
    
    // Add Lead button
    const addLeadBtn = document.getElementById('addLeadBtn');
    if (addLeadBtn) {
        addLeadBtn.addEventListener('click', openAddLead);
    }
    
    // Import Leads button
    const importLeadsBtn = document.getElementById('importLeadsBtn');
    if (importLeadsBtn) {
        importLeadsBtn.addEventListener('click', openImportLeads);
    }
});

function handleLeadsFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    if (!file.name.endsWith('.csv')) {
        showToast('Please upload a CSV file', 'error');
        return;
    }
    
    processLeadsFile(file);
}

function processLeadsFile(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        const csv = e.target.result;
        const leads = parseLeadsCSV(csv);
        
        if (leads.length === 0) {
            showToast('No valid leads found in CSV', 'error');
            return;
        }
        
        displayLeadsImportPreview(leads);
    };
    reader.readAsText(file);
}

function parseLeadsCSV(csv) {
    const lines = csv.split('\n').filter(line => line.trim());
    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    
    const leads = [];
    for (let i = 1; i < lines.length; i++) {
        const values = parseCSVLine(lines[i]);
        const lead = {};
        
        headers.forEach((header, index) => {
            if (values[index]) {
                lead[header] = values[index].trim();
            }
        });
        
        // Validate required fields
        if (lead.email && lead.first_name && lead.last_name && lead.company) {
            lead.valid = validateEmail(lead.email);
            lead.duplicate = false; // In production, check against existing leads
            leads.push(lead);
        }
    }
    
    return leads;
}

function parseCSVLine(line) {
    const values = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        
        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            values.push(current);
            current = '';
        } else {
            current += char;
        }
    }
    values.push(current);
    
    return values.map(v => v.replace(/^"|"$/g, ''));
}

function displayLeadsImportPreview(leads) {
    importedLeadsData = leads;
    
    // Calculate stats
    const total = leads.length;
    const valid = leads.filter(l => l.valid).length;
    const invalid = total - valid;
    const duplicates = leads.filter(l => l.duplicate).length;
    
    // Update stats
    document.getElementById('totalLeadsCount').textContent = total;
    document.getElementById('validLeadsCount').textContent = valid;
    document.getElementById('invalidLeadsCount').textContent = invalid;
    document.getElementById('duplicateLeadsCount').textContent = duplicates;
    
    // Field mapping
    const headers = Object.keys(leads[0]).filter(k => k !== 'valid' && k !== 'duplicate');
    const fieldMapping = {
        'first_name': 'First Name',
        'last_name': 'Last Name',
        'email': 'Email',
        'phone': 'Phone',
        'company': 'Company',
        'title': 'Job Title',
        'industry': 'Industry',
        'source': 'Lead Source',
        'value': 'Lead Value',
        'notes': 'Notes'
    };
    
    const mappingGrid = document.getElementById('fieldMappingGrid');
    mappingGrid.innerHTML = headers.map(header => `
        <div class="mapping-row">
            <div class="mapping-csv-field">${header}</div>
            <div class="mapping-arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
            </div>
            <div class="mapping-crm-field">${fieldMapping[header] || header}</div>
        </div>
    `).join('');
    
    // Sample data table
    const sampleLeads = leads.slice(0, 3);
    const tableHtml = `
        <table>
            <thead>
                <tr>
                    ${headers.map(h => `<th>${fieldMapping[h] || h}</th>`).join('')}
                </tr>
            </thead>
            <tbody>
                ${sampleLeads.map(lead => `
                    <tr>
                        ${headers.map(h => `<td>${escapeHtml(lead[h] || '')}</td>`).join('')}
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    document.getElementById('sampleDataTable').innerHTML = tableHtml;
    
    // Show preview
    document.getElementById('importLeadsPreview').style.display = 'block';
    
    // Enable import button
    document.getElementById('importLeadsBtn').disabled = valid === 0;
    document.getElementById('importCountBadge').textContent = valid;
}

// Confirm Import
window.confirmImportLeads = function() {
    if (!importedLeadsData) return;
    
    const validLeads = importedLeadsData.filter(l => l.valid && !l.duplicate);
    
    if (validLeads.length === 0) {
        showToast('No valid leads to import', 'error');
        return;
    }
    
    showToast(`Importing ${validLeads.length} leads...`, 'info');
    
    setTimeout(() => {
        showToast(`Successfully imported ${validLeads.length} leads!`, 'success');
        console.log('Imported leads:', validLeads);
        closeImportLeads();
        
        // In production:
        // POST /api/leads/import
        // { leads: validLeads }
        // Then refresh the pipeline view
    }, 2000);
};

// ===================================
// OUTREACH MANAGER FUNCTIONALITY
// ===================================

// Dummy outreach campaign data
const outreachCampaigns = {
    1: {
        id: 1,
        name: 'Tech Founder Outreach Q1',
        targetAudience: 'Tech Founders & CTOs',
        totalRecipients: 850,
        sequenceSteps: 4,
        channel: 'Email + LinkedIn',
        status: 'active',
        sent: 347,
        opened: 111,
        replied: 28,
        booked: 12,
        startedAt: '2024-12-15T09:00:00',
        steps: [
            {
                number: 1,
                title: 'Initial Introduction',
                timing: 'Day 1',
                channel: 'Email',
                sent: 347,
                opened: 111,
                replied: 15,
                subject: 'Quick question about [Company]\'s operations',
                content: 'Hi {{first_name}},\n\nI noticed [Company] is scaling fast in the [industry] space.\n\nWe\'ve helped similar companies reduce operational costs by 40% with AI automation.\n\nWould you be open to a 15-min call to explore if this could help [Company]?\n\nBest,\nToni'
            },
            {
                number: 2,
                title: 'LinkedIn Connection',
                timing: 'Day 3',
                channel: 'LinkedIn',
                sent: 236,
                opened: 89,
                replied: 8,
                content: 'Hi {{first_name}}, I sent you an email about AI automation for [Company]. Would love to connect and share some insights that might be valuable for your operations.'
            },
            {
                number: 3,
                title: 'Value-Add Follow Up',
                timing: 'Day 7',
                channel: 'Email',
                sent: 198,
                opened: 76,
                replied: 4,
                subject: 'Case study: How [Similar Company] saved £200K',
                content: 'Hi {{first_name}},\n\nI wanted to share a quick case study of how a company similar to [Company] reduced their operational costs by £200K annually.\n\nThey automated:\n• Lead qualification\n• Customer onboarding\n• Report generation\n\nAll without adding headcount.\n\nInterested in seeing how this applies to [Company]?\n\nBest,\nToni'
            },
            {
                number: 4,
                title: 'Final Touch',
                timing: 'Day 14',
                channel: 'Email',
                sent: 142,
                opened: 54,
                replied: 1,
                subject: 'Last chance: Free operations audit',
                content: 'Hi {{first_name}},\n\nI\'ll keep this brief.\n\nWe\'re offering 10 free operations audits this month to companies like [Company].\n\nIf you\'re interested, reply "YES" and I\'ll send the details.\n\nNo hard sell, just actionable insights.\n\nBest,\nToni'
            }
        ],
        recentActivity: [
            {
                type: 'booked',
                title: 'Meeting Booked',
                description: 'Sarah Thompson (TechCo) booked a demo call',
                time: '2 hours ago'
            },
            {
                type: 'replied',
                title: 'Positive Reply',
                description: 'Michael Chen (InnovateLab) replied: "Interested, let\'s talk"',
                time: '4 hours ago'
            },
            {
                type: 'opened',
                title: 'Email Opened',
                description: '23 recipients opened Step 2 email',
                time: '6 hours ago'
            },
            {
                type: 'sent',
                title: 'Sequence Step Sent',
                description: 'Step 3 sent to 45 recipients',
                time: '8 hours ago'
            },
            {
                type: 'replied',
                title: 'Reply Received',
                description: 'Emma Wilson (FinanceCo) requested more information',
                time: '1 day ago'
            }
        ]
    },
    2: {
        id: 2,
        name: 'Healthcare Provider Campaign',
        targetAudience: 'Healthcare Administrators',
        totalRecipients: 620,
        sequenceSteps: 3,
        channel: 'Email',
        status: 'active',
        sent: 412,
        opened: 157,
        replied: 31,
        booked: 8,
        startedAt: '2024-12-01T10:00:00',
        steps: [],
        recentActivity: []
    },
    3: {
        id: 3,
        name: 'E-commerce Automation Series',
        targetAudience: 'E-commerce Business Owners',
        totalRecipients: 1240,
        sequenceSteps: 5,
        channel: 'Email + LinkedIn',
        status: 'active',
        sent: 892,
        opened: 285,
        replied: 52,
        booked: 18,
        startedAt: '2024-11-20T09:00:00',
        steps: [],
        recentActivity: []
    }
};

let currentOutreachCampaignId = null;

// View Campaign Details
window.viewOutreachDetails = function(campaignId) {
    const campaign = outreachCampaigns[campaignId];
    if (!campaign) {
        showToast('Campaign not found', 'error');
        return;
    }
    
    currentOutreachCampaignId = campaignId;
    
    // Update header
    document.getElementById('outreachCampaignName').textContent = campaign.name;
    document.getElementById('outreachCampaignStatus').textContent = campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1);
    document.getElementById('outreachCampaignStatus').className = `campaign-status-badge ${campaign.status}`;
    
    const date = new Date(campaign.startedAt);
    document.getElementById('outreachCampaignDate').textContent = `Started ${date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}`;
    
    // Update overview
    document.getElementById('outreachTargetAudience').textContent = campaign.targetAudience;
    document.getElementById('outreachTotalRecipients').textContent = campaign.totalRecipients.toLocaleString();
    document.getElementById('outreachSequenceSteps').textContent = `${campaign.sequenceSteps} emails`;
    document.getElementById('outreachChannel').textContent = campaign.channel;
    
    // Update metrics
    document.getElementById('outreachSent').textContent = campaign.sent.toLocaleString();
    document.getElementById('outreachOpened').textContent = `${Math.round((campaign.opened / campaign.sent) * 100)}%`;
    document.getElementById('outreachReplied').textContent = `${Math.round((campaign.replied / campaign.sent) * 100)}%`;
    document.getElementById('outreachBooked').textContent = campaign.booked;
    
    // Render sequence steps
    renderSequenceSteps(campaign.steps);
    
    // Render recent activity
    renderRecentActivity(campaign.recentActivity);
    
    document.getElementById('outreachDetailsModal').classList.add('active');
};

window.closeOutreachDetails = function() {
    document.getElementById('outreachDetailsModal').classList.remove('active');
    currentOutreachCampaignId = null;
};

function renderSequenceSteps(steps) {
    const container = document.getElementById('sequenceStepsList');
    
    if (!steps || steps.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--text-muted);">No sequence steps configured</p>';
        return;
    }
    
    container.innerHTML = steps.map(step => {
        const openRate = step.sent > 0 ? Math.round((step.opened / step.sent) * 100) : 0;
        const replyRate = step.sent > 0 ? Math.round((step.replied / step.sent) * 100) : 0;
        
        return `
            <div class="sequence-step">
                <div class="sequence-step-header">
                    <div class="sequence-step-info">
                        <div class="sequence-step-number">Step ${step.number} • ${step.channel}</div>
                        <div class="sequence-step-title">${step.title}</div>
                        <div class="sequence-step-timing">${step.timing}</div>
                    </div>
                    <div class="sequence-step-stats">
                        <div class="step-stat">
                            <div class="step-stat-value">${step.sent}</div>
                            <div class="step-stat-label">Sent</div>
                        </div>
                        <div class="step-stat">
                            <div class="step-stat-value">${openRate}%</div>
                            <div class="step-stat-label">Opened</div>
                        </div>
                        <div class="step-stat">
                            <div class="step-stat-value">${replyRate}%</div>
                            <div class="step-stat-label">Replied</div>
                        </div>
                    </div>
                </div>
                ${step.subject ? `<div style="font-size: 13px; color: var(--text-secondary); margin-bottom: 8px;"><strong>Subject:</strong> ${escapeHtml(step.subject)}</div>` : ''}
                <div class="sequence-step-content">${escapeHtml(step.content)}</div>
            </div>
        `;
    }).join('');
}

function renderRecentActivity(activities) {
    const container = document.getElementById('recentActivityList');
    
    if (!activities || activities.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--text-muted);">No recent activity</p>';
        return;
    }
    
    const iconMap = {
        sent: '<line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>',
        opened: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>',
        replied: '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>',
        booked: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>'
    };
    
    container.innerHTML = activities.map(activity => `
        <div class="activity-item">
            <div class="activity-icon ${activity.type}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    ${iconMap[activity.type] || ''}
                </svg>
            </div>
            <div class="activity-content">
                <div class="activity-title">${activity.title}</div>
                <div class="activity-description">${escapeHtml(activity.description)}</div>
                <div class="activity-time">${activity.time}</div>
            </div>
        </div>
    `).join('');
}

// Export Outreach Report
window.exportOutreachReport = function() {
    if (!currentOutreachCampaignId) return;
    
    showToast('Generating campaign report...', 'info');
    
    setTimeout(() => {
        showToast('Report downloaded successfully!', 'success');
        console.log('Export outreach report:', currentOutreachCampaignId);
        // In production: generate PDF with full campaign details
    }, 1500);
};

// Edit Outreach Campaign
window.editOutreachCampaign = function() {
    if (!currentOutreachCampaignId) return;
    
    closeOutreachDetails();
    showToast('Edit functionality - would open campaign builder', 'info');
    console.log('Edit campaign:', currentOutreachCampaignId);
    // In production: open campaign builder with pre-filled data
};

// Pause Campaign
window.pauseOutreachCampaign = function(campaignId) {
    const campaign = outreachCampaigns[campaignId];
    if (!campaign) return;
    
    currentOutreachCampaignId = campaignId;
    
    // Update pause message
    document.getElementById('pauseCampaignMessage').textContent = 
        `This will stop all scheduled messages for "${campaign.name}". You can resume the campaign at any time.`;
    
    document.getElementById('pauseOutreachModal').classList.add('active');
};

window.closePauseOutreach = function() {
    document.getElementById('pauseOutreachModal').classList.remove('active');
    currentOutreachCampaignId = null;
};

window.confirmPauseOutreach = function() {
    if (!currentOutreachCampaignId) return;
    
    const campaign = outreachCampaigns[currentOutreachCampaignId];
    if (campaign) {
        campaign.status = 'paused';
        showToast('Campaign paused successfully', 'success');
        console.log('Paused campaign:', currentOutreachCampaignId);
        
        closePauseOutreach();
        
        // In production:
        // POST /api/outreach-campaigns/:id/pause
        // Then refresh the campaigns list
    }
};

// Resume Campaign
window.resumeOutreachCampaign = function(campaignId) {
    const campaign = outreachCampaigns[campaignId];
    if (!campaign) return;
    
    if (confirm(`Resume "${campaign.name}"? Scheduled messages will start sending again.`)) {
        campaign.status = 'active';
        showToast('Campaign resumed successfully', 'success');
        console.log('Resumed campaign:', campaignId);
        
        // In production:
        // POST /api/outreach-campaigns/:id/resume
        // Then refresh the campaigns list
    }
};

// Initialize Outreach Manager buttons
document.addEventListener('DOMContentLoaded', function() {
    // View Details buttons would be added to campaign cards dynamically
    // For now, they can be called directly: viewOutreachDetails(1)
});

// ===================================
// ANALYTICS EXPORT FUNCTIONALITY
// ===================================

// Open Export Analytics Modal
window.openExportAnalytics = function() {
    document.getElementById('exportAnalyticsModal').classList.add('active');
    updateReportPreview();
};

window.closeExportAnalytics = function() {
    document.getElementById('exportAnalyticsModal').classList.remove('active');
};

// Initialize Export Analytics listeners
document.addEventListener('DOMContentLoaded', function() {
    // Date range radio buttons
    const dateRangeInputs = document.querySelectorAll('input[name="dateRange"]');
    dateRangeInputs.forEach(input => {
        input.addEventListener('change', function() {
            const customRange = document.getElementById('customDateRange');
            if (this.value === 'custom') {
                customRange.style.display = 'block';
                
                // Set default dates
                const endDate = new Date();
                const startDate = new Date();
                startDate.setDate(startDate.getDate() - 30);
                
                document.getElementById('exportStartDate').value = startDate.toISOString().split('T')[0];
                document.getElementById('exportEndDate').value = endDate.toISOString().split('T')[0];
            } else {
                customRange.style.display = 'none';
            }
            updateReportPreview();
        });
    });
    
    // Metrics checkboxes
    const metricInputs = document.querySelectorAll('input[name="metric"]');
    metricInputs.forEach(input => {
        input.addEventListener('change', updateReportPreview);
    });
    
    // Charts checkboxes
    const chartInputs = document.querySelectorAll('input[name="chart"]');
    chartInputs.forEach(input => {
        input.addEventListener('change', updateReportPreview);
    });
    
    // Format radio buttons
    const formatInputs = document.querySelectorAll('input[name="format"]');
    formatInputs.forEach(input => {
        input.addEventListener('change', updateReportPreview);
    });
    
    // Export Report button in Analytics page
    const exportReportBtn = document.getElementById('exportReportBtn');
    if (exportReportBtn) {
        exportReportBtn.addEventListener('click', openExportAnalytics);
    }
});

// Update Report Preview Text
function updateReportPreview() {
    const selectedDateRange = document.querySelector('input[name="dateRange"]:checked');
    const selectedMetrics = Array.from(document.querySelectorAll('input[name="metric"]:checked'));
    const selectedCharts = Array.from(document.querySelectorAll('input[name="chart"]:checked'));
    const selectedFormat = document.querySelector('input[name="format"]:checked');
    
    if (!selectedDateRange || !selectedFormat) return;
    
    // Build preview text
    let previewText = 'Your report will include ';
    
    // Date range
    const dateRangeMap = {
        'last7days': 'data from the last 7 days',
        'last30days': 'data from the last 30 days',
        'last90days': 'data from the last 90 days',
        'thisMonth': 'data from this month',
        'lastMonth': 'data from last month',
        'custom': 'data from your custom date range'
    };
    previewText += dateRangeMap[selectedDateRange.value] + ' with ';
    
    // Metrics
    if (selectedMetrics.length > 0) {
        const metricNames = {
            'overview': 'overview stats',
            'campaigns': 'campaign performance',
            'leads': 'lead pipeline',
            'social': 'social media',
            'content': 'content performance',
            'roi': 'ROI analysis'
        };
        const metrics = selectedMetrics.map(m => metricNames[m.value]).join(', ');
        previewText += metrics;
    } else {
        previewText += 'no metrics selected';
    }
    
    // Charts
    if (selectedCharts.length > 0) {
        const chartNames = {
            'trends': 'performance trends',
            'funnel': 'conversion funnel',
            'breakdown': 'channel breakdown',
            'comparison': 'period comparison'
        };
        const charts = selectedCharts.map(c => chartNames[c.value]).join(', ');
        previewText += ' with ' + charts + ' charts';
    }
    
    // Format
    const formatNames = {
        'pdf': 'PDF',
        'excel': 'Excel',
        'csv': 'CSV',
        'powerpoint': 'PowerPoint'
    };
    previewText += ' in ' + formatNames[selectedFormat.value] + ' format.';
    
    document.getElementById('reportPreviewText').textContent = previewText;
}

// Generate Analytics Report
window.generateAnalyticsReport = function() {
    const selectedDateRange = document.querySelector('input[name="dateRange"]:checked');
    const selectedMetrics = Array.from(document.querySelectorAll('input[name="metric"]:checked'));
    const selectedCharts = Array.from(document.querySelectorAll('input[name="chart"]:checked'));
    const selectedFormat = document.querySelector('input[name="format"]:checked');
    const selectedOptions = Array.from(document.querySelectorAll('input[name="option"]:checked'));
    
    // Validation
    if (selectedMetrics.length === 0) {
        showToast('Please select at least one metric to include', 'error');
        return;
    }
    
    // Build report config
    const reportConfig = {
        dateRange: selectedDateRange.value,
        customDates: null,
        metrics: selectedMetrics.map(m => m.value),
        charts: selectedCharts.map(c => c.value),
        format: selectedFormat.value,
        options: selectedOptions.map(o => o.value)
    };
    
    // Get custom dates if selected
    if (selectedDateRange.value === 'custom') {
        const startDate = document.getElementById('exportStartDate').value;
        const endDate = document.getElementById('exportEndDate').value;
        
        if (!startDate || !endDate) {
            showToast('Please select custom date range', 'error');
            return;
        }
        
        reportConfig.customDates = { startDate, endDate };
    }
    
    // Show generation progress
    closeExportAnalytics();
    showToast('Generating your analytics report...', 'info');
    
    // Simulate report generation
    setTimeout(() => {
        showToast('Report generated successfully!', 'success');
        console.log('Generated report:', reportConfig);
        
        // In production:
        // POST /api/analytics/export
        // { ...reportConfig }
        // Returns: { downloadUrl, filename }
        // Then: window.location.href = downloadUrl
        
        // Simulate download
        const formatExtensions = {
            'pdf': '.pdf',
            'excel': '.xlsx',
            'csv': '.csv',
            'powerpoint': '.pptx'
        };
        
        const filename = `analytics-report-${new Date().toISOString().split('T')[0]}${formatExtensions[reportConfig.format]}`;
        console.log('Download:', filename);
        
        // Show success with file details
        showToast(`📥 Downloading ${filename}`, 'success');
    }, 2500);
};

// Helper: Get Date Range Label
function getDateRangeLabel(range, customDates) {
    if (range === 'custom' && customDates) {
        return `${customDates.startDate} to ${customDates.endDate}`;
    }
    
    const labels = {
        'last7days': 'Last 7 Days',
        'last30days': 'Last 30 Days',
        'last90days': 'Last 90 Days',
        'thisMonth': 'This Month',
        'lastMonth': 'Last Month'
    };
    
    return labels[range] || range;
}

// Helper: Get Metrics Summary
function getMetricsSummary(metrics) {
    const names = {
        'overview': 'Overview',
        'campaigns': 'Campaigns',
        'leads': 'Leads',
        'social': 'Social',
        'content': 'Content',
        'roi': 'ROI'
    };
    
    return metrics.map(m => names[m] || m).join(', ');
}

// Update campaign data to match card IDs
// Updating existing campaigns data with proper IDs
outreachCampaigns[2] = {
    id: 2,
    name: 'Client Reactivation',
    targetAudience: 'Inactive Clients',
    totalRecipients: 200,
    sequenceSteps: 3,
    channel: 'Email',
    status: 'active',
    sent: 156,
    opened: 31,
    replied: 8,
    booked: 5,
    startedAt: '2024-11-28T10:00:00',
    steps: [
        {
            number: 1,
            title: 'Re-engagement Email',
            timing: 'Day 1',
            channel: 'Email',
            sent: 156,
            opened: 31,
            replied: 5,
            subject: 'We miss you! Here\'s what we\'ve been up to',
            content: 'Hi {{first_name}},\n\nIt\'s been a while since we last connected.\n\nWe\'ve made some exciting improvements to our platform:\n• New automation features\n• Enhanced analytics\n• Faster processing\n\nWould love to catch up and show you what\'s new.\n\nBest,\nToni'
        },
        {
            number: 2,
            title: 'Value Reminder',
            timing: 'Day 5',
            channel: 'Email',
            sent: 78,
            opened: 19,
            replied: 2,
            subject: 'Quick reminder: Your account benefits',
            content: 'Hi {{first_name}},\n\nJust a friendly reminder of what you\'re missing:\n✓ Unlimited campaigns\n✓ Advanced targeting\n✓ Priority support\n\nReady to jump back in?\n\nBest,\nToni'
        },
        {
            number: 3,
            title: 'Special Offer',
            timing: 'Day 10',
            channel: 'Email',
            sent: 45,
            opened: 12,
            replied: 1,
            subject: 'Exclusive: 20% off for returning clients',
            content: 'Hi {{first_name}},\n\nWe\'d love to have you back.\n\nExclusive offer: 20% off for the next 3 months.\n\nUse code WELCOME20 at checkout.\n\nOffer expires in 48 hours.\n\nBest,\nToni'
        }
    ],
    recentActivity: [
        {
            type: 'replied',
            title: 'Positive Response',
            description: 'David Johnson replied: "Interested in the offer"',
            time: '3 hours ago'
        },
        {
            type: 'opened',
            title: 'Email Opened',
            description: '12 recipients opened Step 3 email',
            time: '5 hours ago'
        },
        {
            type: 'sent',
            title: 'Step Sent',
            description: 'Step 3 sent to 45 recipients',
            time: '1 day ago'
        }
    ]
};

outreachCampaigns[3] = {
    id: 3,
    name: 'Product Launch Announcement',
    targetAudience: 'Existing Customers',
    totalRecipients: 2000,
    sequenceSteps: 4,
    channel: 'LinkedIn + Email',
    status: 'paused',
    sent: 844,
    opened: 152,
    replied: 39,
    booked: 24,
    startedAt: '2024-11-15T09:00:00',
    steps: [
        {
            number: 1,
            title: 'Teaser Announcement',
            timing: 'Day 1',
            channel: 'Email',
            sent: 844,
            opened: 152,
            replied: 15,
            subject: '🚀 Something big is coming...',
            content: 'Hi {{first_name}},\n\nWe\'ve been working on something special.\n\nA game-changing feature that will transform how you work.\n\nStay tuned for the big reveal next week!\n\nBest,\nToni'
        },
        {
            number: 2,
            title: 'LinkedIn Post Share',
            timing: 'Day 3',
            channel: 'LinkedIn',
            sent: 500,
            opened: 89,
            replied: 12,
            content: 'The wait is almost over! Our biggest product update is launching Monday. Here\'s a sneak peek... 👀'
        },
        {
            number: 3,
            title: 'Launch Day Email',
            timing: 'Day 7',
            channel: 'Email',
            sent: 0,
            opened: 0,
            replied: 0,
            subject: '🎉 It\'s here! Introducing [Feature Name]',
            content: 'Hi {{first_name}},\n\nToday we\'re launching [Feature Name].\n\nThis will help you:\n• Save 10+ hours per week\n• Automate complex workflows\n• Scale without limits\n\nGet started now: [Link]\n\nBest,\nToni'
        },
        {
            number: 4,
            title: 'Follow-up',
            timing: 'Day 14',
            channel: 'Email',
            sent: 0,
            opened: 0,
            replied: 0,
            subject: 'Have you tried [Feature Name] yet?',
            content: 'Hi {{first_name}},\n\nJust checking in - have you had a chance to try the new feature?\n\nNeed help getting started? Book a demo call.\n\nBest,\nToni'
        }
    ],
    recentActivity: [
        {
            type: 'booked',
            title: 'Demo Booked',
            description: 'Robert Martinez booked product demo',
            time: '1 day ago'
        },
        {
            type: 'replied',
            title: 'Feature Request',
            description: 'Lisa Anderson replied with feedback',
            time: '2 days ago'
        },
        {
            type: 'opened',
            title: 'High Engagement',
            description: '89 recipients opened LinkedIn message',
            time: '3 days ago'
        }
    ]
};

// ===================================
// OUTREACH EDIT & EXPORT FUNCTIONALITY
// ===================================

// Edit Outreach Campaign
window.editOutreachCampaign = function() {
    if (!currentOutreachCampaignId) return;
    
    const campaign = outreachCampaigns[currentOutreachCampaignId];
    if (!campaign) return;
    
    // Close details modal
    closeOutreachDetails();
    
    // Populate edit form
    document.getElementById('editOutreachName').value = campaign.name;
    document.getElementById('editOutreachAudience').value = campaign.targetAudience;
    document.getElementById('editOutreachRecipients').value = campaign.totalRecipients;
    document.getElementById('editDailyLimit').value = '50';
    document.getElementById('editSendingSchedule').value = 'business-hours';
    
    // Load sequence steps
    loadSequenceSteps(campaign.steps || []);
    
    // Open edit modal
    document.getElementById('editOutreachCampaignModal').classList.add('active');
};

window.closeEditOutreachCampaign = function() {
    document.getElementById('editOutreachCampaignModal').classList.remove('active');
};

function loadSequenceSteps(steps) {
    const container = document.getElementById('editSequenceSteps');
    
    if (!steps || steps.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--text-muted); padding: 20px;">No steps configured. Click "Add Step" to create your sequence.</p>';
        return;
    }
    
    container.innerHTML = steps.map((step, index) => `
        <div class="sequence-step-editor" data-step="${index}">
            <div class="sequence-step-editor-header">
                <div class="step-editor-title">Step ${step.number}: ${step.title}</div>
                <button class="step-editor-remove" onclick="removeSequenceStep(${index})">Remove</button>
            </div>
            <div class="form-group">
                <label class="form-label">Step Title</label>
                <input type="text" class="form-input" value="${escapeHtml(step.title)}" data-field="title">
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label class="form-label">Timing</label>
                    <input type="text" class="form-input" value="${escapeHtml(step.timing)}" data-field="timing" placeholder="Day 1">
                </div>
                <div class="form-group">
                    <label class="form-label">Channel</label>
                    <select class="form-input" data-field="channel">
                        <option value="email" ${step.channel === 'Email' ? 'selected' : ''}>Email</option>
                        <option value="linkedin" ${step.channel === 'LinkedIn' ? 'selected' : ''}>LinkedIn</option>
                        <option value="phone" ${step.channel === 'Phone' ? 'selected' : ''}>Phone</option>
                    </select>
                </div>
            </div>
            ${step.subject ? `
            <div class="form-group">
                <label class="form-label">Subject Line</label>
                <input type="text" class="form-input" value="${escapeHtml(step.subject)}" data-field="subject">
            </div>
            ` : ''}
            <div class="form-group">
                <label class="form-label">Message Content</label>
                <textarea class="form-textarea" rows="6" data-field="content">${escapeHtml(step.content)}</textarea>
            </div>
        </div>
    `).join('');
}

window.addSequenceStep = function() {
    const container = document.getElementById('editSequenceSteps');
    const currentSteps = container.querySelectorAll('.sequence-step-editor').length;
    const stepNumber = currentSteps + 1;
    
    const newStep = `
        <div class="sequence-step-editor" data-step="${currentSteps}">
            <div class="sequence-step-editor-header">
                <div class="step-editor-title">Step ${stepNumber}: New Step</div>
                <button class="step-editor-remove" onclick="removeSequenceStep(${currentSteps})">Remove</button>
            </div>
            <div class="form-group">
                <label class="form-label">Step Title</label>
                <input type="text" class="form-input" value="New Step" data-field="title">
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label class="form-label">Timing</label>
                    <input type="text" class="form-input" value="Day ${stepNumber}" data-field="timing" placeholder="Day 1">
                </div>
                <div class="form-group">
                    <label class="form-label">Channel</label>
                    <select class="form-input" data-field="channel">
                        <option value="email">Email</option>
                        <option value="linkedin">LinkedIn</option>
                        <option value="phone">Phone</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label class="form-label">Subject Line</label>
                <input type="text" class="form-input" data-field="subject" placeholder="Email subject...">
            </div>
            <div class="form-group">
                <label class="form-label">Message Content</label>
                <textarea class="form-textarea" rows="6" data-field="content" placeholder="Hi {{first_name}},

Your message here...

Best,
Toni"></textarea>
            </div>
        </div>
    `;
    
    // Remove empty message if exists
    const emptyMessage = container.querySelector('p');
    if (emptyMessage) {
        container.innerHTML = '';
    }
    
    container.insertAdjacentHTML('beforeend', newStep);
};

window.removeSequenceStep = function(index) {
    if (!confirm('Remove this step from the sequence?')) return;
    
    const container = document.getElementById('editSequenceSteps');
    const step = container.querySelector(`[data-step="${index}"]`);
    
    if (step) {
        step.remove();
        
        // Check if no steps left
        if (container.querySelectorAll('.sequence-step-editor').length === 0) {
            container.innerHTML = '<p style="text-align: center; color: var(--text-muted); padding: 20px;">No steps configured. Click "Add Step" to create your sequence.</p>';
        }
    }
};

window.saveOutreachCampaignEdit = function() {
    if (!currentOutreachCampaignId) return;
    
    const campaign = outreachCampaigns[currentOutreachCampaignId];
    if (!campaign) return;
    
    // Get form values
    campaign.name = document.getElementById('editOutreachName').value;
    campaign.targetAudience = document.getElementById('editOutreachAudience').value;
    campaign.totalRecipients = parseInt(document.getElementById('editOutreachRecipients').value);
    
    // Get sequence steps
    const stepEditors = document.querySelectorAll('.sequence-step-editor');
    const updatedSteps = Array.from(stepEditors).map((editor, index) => {
        return {
            number: index + 1,
            title: editor.querySelector('[data-field="title"]').value,
            timing: editor.querySelector('[data-field="timing"]').value,
            channel: editor.querySelector('[data-field="channel"]').value,
            subject: editor.querySelector('[data-field="subject"]')?.value || '',
            content: editor.querySelector('[data-field="content"]').value,
            sent: campaign.steps[index]?.sent || 0,
            opened: campaign.steps[index]?.opened || 0,
            replied: campaign.steps[index]?.replied || 0
        };
    });
    
    campaign.steps = updatedSteps;
    campaign.sequenceSteps = updatedSteps.length;
    
    showToast('Campaign updated successfully!', 'success');
    console.log('Updated campaign:', campaign);
    
    closeEditOutreachCampaign();
    
    // In production:
    // PATCH /api/outreach-campaigns/:id
    // { name, targetAudience, totalRecipients, steps, settings }
};

// Export Outreach Report
window.exportOutreachReport = function() {
    if (!currentOutreachCampaignId) return;
    
    const campaign = outreachCampaigns[currentOutreachCampaignId];
    if (!campaign) return;
    
    // Close details modal
    closeOutreachDetails();
    
    // Populate export modal
    document.getElementById('exportOutreachCampaignName').textContent = campaign.name;
    
    const openRate = campaign.sent > 0 ? Math.round((campaign.opened / campaign.sent) * 100) : 0;
    const replyRate = campaign.sent > 0 ? Math.round((campaign.replied / campaign.sent) * 100) : 0;
    
    document.getElementById('exportOutreachCampaignStats').textContent = 
        `${campaign.sent} sent • ${openRate}% opened • ${replyRate}% replied • ${campaign.booked} meetings booked`;
    
    // Open export modal
    document.getElementById('exportOutreachReportModal').classList.add('active');
};

window.closeExportOutreachReport = function() {
    document.getElementById('exportOutreachReportModal').classList.remove('active');
};

window.generateOutreachReport = function() {
    if (!currentOutreachCampaignId) return;
    
    const campaign = outreachCampaigns[currentOutreachCampaignId];
    if (!campaign) return;
    
    // Get selected sections
    const selectedSections = Array.from(document.querySelectorAll('input[name="outreach-section"]:checked'))
        .map(cb => cb.value);
    
    if (selectedSections.length === 0) {
        showToast('Please select at least one section to include', 'error');
        return;
    }
    
    // Get selected format
    const selectedFormat = document.querySelector('input[name="outreach-format"]:checked').value;
    
    // Get options
    const selectedOptions = Array.from(document.querySelectorAll('input[name="outreach-option"]:checked'))
        .map(cb => cb.value);
    
    // Build report config
    const reportConfig = {
        campaignId: currentOutreachCampaignId,
        campaignName: campaign.name,
        sections: selectedSections,
        format: selectedFormat,
        options: selectedOptions
    };
    
    closeExportOutreachReport();
    showToast('Generating campaign report...', 'info');
    
    setTimeout(() => {
        const formatExtensions = {
            'pdf': '.pdf',
            'excel': '.xlsx',
            'csv': '.csv'
        };
        
        const safeName = campaign.name.toLowerCase().replace(/\s+/g, '-');
        const filename = `${safeName}-report-${new Date().toISOString().split('T')[0]}${formatExtensions[selectedFormat]}`;
        
        showToast(`Report generated successfully!`, 'success');
        console.log('Generated report:', reportConfig);
        console.log('Download:', filename);
        
        // Show download notification
        setTimeout(() => {
            showToast(`📥 Downloading ${filename}`, 'success');
        }, 500);
        
        // In production:
        // POST /api/outreach-campaigns/:id/export
        // { sections, format, options }
        // Returns: { downloadUrl, filename }
    }, 2000);
};

// ===================================
// EMAIL TEMPLATES & NEW CAMPAIGN
// ===================================

// Template Data
const emailTemplates = [
    {
        id: 1,
        name: 'Welcome Email',
        category: 'welcome',
        description: 'Perfect first impression for new subscribers',
        uses: 1247,
        subject: 'Welcome to {{company_name}}!',
        content: `Hi {{first_name}},

Welcome to {{company_name}}! We're thrilled to have you here.

Here's what you can expect:
• Weekly tips and insights
• Exclusive offers
• Product updates

Get started by exploring our platform.

Best regards,
The {{company_name}} Team`
    },
    {
        id: 2,
        name: 'Product Launch',
        category: 'promotional',
        description: 'Announce new products with excitement',
        uses: 892,
        subject: '🚀 Introducing Our Latest Innovation',
        content: `Hi {{first_name}},

We're excited to announce our newest product!

{{product_name}} is here to transform the way you work.

Key features:
• Feature 1
• Feature 2
• Feature 3

Get started today: {{product_link}}

Best,
{{company_name}}`
    },
    {
        id: 3,
        name: 'Weekly Newsletter',
        category: 'newsletter',
        description: 'Keep subscribers engaged weekly',
        uses: 2341,
        subject: '📰 This Week\'s Top Stories',
        content: `Hi {{first_name}},

Here's what happened this week at {{company_name}}:

1. Story Headline One
   Brief description...

2. Story Headline Two
   Brief description...

3. Story Headline Three
   Brief description...

See you next week!
{{company_name}}`
    },
    {
        id: 4,
        name: 'Event Invitation',
        category: 'promotional',
        description: 'Drive registrations for events',
        uses: 567,
        subject: 'You\'re Invited: {{event_name}}',
        content: `Hi {{first_name}},

You're invited to join us for {{event_name}}!

When: {{event_date}}
Where: {{event_location}}

This exclusive event will feature:
• Keynote speakers
• Networking opportunities
• Live demos

Reserve your spot: {{registration_link}}

Hope to see you there!
{{company_name}}`
    },
    {
        id: 5,
        name: 'Holiday Sale',
        category: 'promotional',
        description: 'Boost sales during holidays',
        uses: 1456,
        subject: '🎄 Holiday Sale: Up to 50% Off!',
        content: `Hi {{first_name}},

Our biggest sale of the year is here!

Save up to 50% on everything.

Use code: HOLIDAY50

Sale ends {{sale_end_date}}

Shop now: {{shop_link}}

Happy holidays!
{{company_name}}`
    },
    {
        id: 6,
        name: 'Order Confirmation',
        category: 'transactional',
        description: 'Confirm customer orders',
        uses: 3421,
        subject: 'Order Confirmation #{{order_number}}',
        content: `Hi {{first_name}},

Thank you for your order!

Order #{{order_number}}
Total: {{order_total}}

Your order is being processed and will ship soon.

Track your order: {{tracking_link}}

Thanks,
{{company_name}}`
    },
    {
        id: 7,
        name: 'Re-engagement',
        category: 'welcome',
        description: 'Win back inactive subscribers',
        uses: 734,
        subject: 'We Miss You! Come Back for 20% Off',
        content: `Hi {{first_name}},

We noticed you haven't visited in a while.

We'd love to have you back!

Here's 20% off your next purchase:
Code: COMEBACK20

Valid for 7 days.

{{shop_link}}

Best,
{{company_name}}`
    },
    {
        id: 8,
        name: 'Monthly Report',
        category: 'newsletter',
        description: 'Share monthly performance updates',
        uses: 456,
        subject: '📊 Your Monthly Report - {{month}}',
        content: `Hi {{first_name}},

Here's your monthly summary for {{month}}:

Key Metrics:
• Metric 1: {{value_1}}
• Metric 2: {{value_2}}
• Metric 3: {{value_3}}

View full report: {{report_link}}

Keep up the great work!
{{company_name}}`
    }
];

// Open Template Library
window.openTemplateLibrary = function() {
    renderTemplates('all');
    document.getElementById('templateLibraryModal').classList.add('active');
};

window.closeTemplateLibrary = function() {
    document.getElementById('templateLibraryModal').classList.remove('active');
};

// Render Templates
function renderTemplates(category) {
    const grid = document.getElementById('templatesGrid');
    const filtered = category === 'all' 
        ? emailTemplates 
        : emailTemplates.filter(t => t.category === category);
    
    grid.innerHTML = filtered.map(template => `
        <div class="template-card" onclick="useTemplate(${template.id})">
            <div class="template-preview">
                <div class="template-preview-icon">📧</div>
                <div class="template-badge">${getCategoryName(template.category)}</div>
            </div>
            <div class="template-info">
                <div class="template-name">${template.name}</div>
                <div class="template-description">${template.description}</div>
                <div class="template-meta">
                    <div class="template-uses">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                        ${template.uses} uses
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function getCategoryName(category) {
    const names = {
        'welcome': 'Welcome',
        'promotional': 'Promo',
        'newsletter': 'Newsletter',
        'transactional': 'Transactional'
    };
    return names[category] || category;
}

// Use Template
window.useTemplate = function(templateId) {
    const template = emailTemplates.find(t => t.id === templateId);
    if (!template) return;
    
    closeTemplateLibrary();
    openNewCampaignEmail();
    
    // Pre-fill with template
    document.querySelector('input[name="contentType"][value="template"]').checked = true;
    document.getElementById('selectedTemplate').value = templateId;
    document.getElementById('newCampaignSubject').value = template.subject;
    
    showToast(`Template "${template.name}" loaded!`, 'success');
};

// Initialize Template Category Buttons
document.addEventListener('DOMContentLoaded', function() {
    const templateLibraryBtn = document.getElementById('templateLibraryBtn');
    if (templateLibraryBtn) {
        templateLibraryBtn.addEventListener('click', openTemplateLibrary);
    }
    
    const createCampaignEmailBtn = document.getElementById('createCampaignEmailBtn');
    if (createCampaignEmailBtn) {
        createCampaignEmailBtn.addEventListener('click', openNewCampaignEmail);
    }
    
    // Template category buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('template-category-btn')) {
            document.querySelectorAll('.template-category-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            e.target.classList.add('active');
            renderTemplates(e.target.dataset.category);
        }
    });
});

// Open New Campaign Modal
window.openNewCampaignEmail = function() {
    // Set default date/time for scheduling
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    document.getElementById('newCampaignDate').value = tomorrow.toISOString().split('T')[0];
    document.getElementById('newCampaignTime').value = '10:00';
    
    document.getElementById('newCampaignEmailModal').classList.add('active');
};

window.closeNewCampaignEmail = function() {
    document.getElementById('newCampaignEmailModal').classList.remove('active');
    // Reset form
    document.getElementById('newCampaignName').value = '';
    document.getElementById('newCampaignSubject').value = '';
    document.getElementById('newCampaignPreview').value = '';
    document.getElementById('selectedTemplate').value = '';
    document.getElementById('newCampaignContent').value = '';
    document.getElementById('newCampaignRecipients').value = '';
};

// Content Type Toggle
document.addEventListener('DOMContentLoaded', function() {
    const contentTypeInputs = document.querySelectorAll('input[name="contentType"]');
    contentTypeInputs.forEach(input => {
        input.addEventListener('change', function() {
            if (this.value === 'template') {
                document.getElementById('templateSelection').style.display = 'block';
                document.getElementById('customContent').style.display = 'none';
            } else {
                document.getElementById('templateSelection').style.display = 'none';
                document.getElementById('customContent').style.display = 'block';
            }
        });
    });
    
    // Schedule Type Toggle
    const scheduleTypeInputs = document.querySelectorAll('input[name="scheduleType"]');
    scheduleTypeInputs.forEach(input => {
        input.addEventListener('change', function() {
            if (this.value === 'later') {
                document.getElementById('scheduleDateTime').style.display = 'block';
            } else {
                document.getElementById('scheduleDateTime').style.display = 'none';
            }
        });
    });
});

// Save Campaign as Draft
window.saveCampaignDraft = function() {
    const name = document.getElementById('newCampaignName').value.trim();
    
    if (!name) {
        showToast('Please enter a campaign name', 'error');
        return;
    }
    
    const campaignData = {
        name,
        subject: document.getElementById('newCampaignSubject').value,
        preview: document.getElementById('newCampaignPreview').value,
        contentType: document.querySelector('input[name="contentType"]:checked').value,
        template: document.getElementById('selectedTemplate').value,
        customContent: document.getElementById('newCampaignContent').value,
        recipients: document.getElementById('newCampaignRecipients').value,
        status: 'draft'
    };
    
    showToast('Campaign saved as draft!', 'success');
    console.log('Draft campaign:', campaignData);
    closeNewCampaignEmail();
    
    // In production:
    // POST /api/email-campaigns
    // { ...campaignData, status: 'draft' }
};

// Create Email Campaign
window.createEmailCampaign = function() {
    const name = document.getElementById('newCampaignName').value.trim();
    const subject = document.getElementById('newCampaignSubject').value.trim();
    const recipients = document.getElementById('newCampaignRecipients').value;
    
    // Validation
    if (!name) {
        showToast('Please enter a campaign name', 'error');
        return;
    }
    
    if (!subject) {
        showToast('Please enter a subject line', 'error');
        return;
    }
    
    if (!recipients) {
        showToast('Please select recipients', 'error');
        return;
    }
    
    const scheduleType = document.querySelector('input[name="scheduleType"]:checked').value;
    const contentType = document.querySelector('input[name="contentType"]:checked').value;
    
    const campaignData = {
        name,
        subject,
        preview: document.getElementById('newCampaignPreview').value,
        contentType,
        template: document.getElementById('selectedTemplate').value,
        customContent: document.getElementById('newCampaignContent').value,
        recipients,
        scheduleType,
        scheduledFor: scheduleType === 'later' 
            ? `${document.getElementById('newCampaignDate').value}T${document.getElementById('newCampaignTime').value}:00`
            : null,
        trackOpens: document.getElementById('trackOpens').checked,
        trackClicks: document.getElementById('trackClicks').checked,
        includeUnsubscribe: document.getElementById('enableUnsubscribe').checked,
        status: scheduleType === 'now' ? 'active' : 'scheduled',
        createdAt: new Date().toISOString()
    };
    
    closeNewCampaignEmail();
    
    if (scheduleType === 'now') {
        showToast('Campaign created and sending now!', 'success');
    } else {
        showToast('Campaign scheduled successfully!', 'success');
    }
    
    console.log('Created campaign:', campaignData);
    
    // In production:
    // POST /api/email-campaigns
    // { ...campaignData }
    // Then refresh campaigns list
};

// ===================================
// ENHANCED TRACKING OPTIONS INTERACTIVITY
// ===================================

// Add real-time feedback for tracking options
document.addEventListener('DOMContentLoaded', function() {
    // Track Opens Checkbox
    const trackOpensCheckbox = document.getElementById('trackOpens');
    if (trackOpensCheckbox) {
        trackOpensCheckbox.addEventListener('change', function() {
            if (this.checked) {
                showToast('✓ Email opens will be tracked', 'success');
                console.log('Tracking enabled: Email Opens');
            } else {
                showToast('Email opens tracking disabled', 'info');
                console.log('Tracking disabled: Email Opens');
            }
        });
    }
    
    // Track Clicks Checkbox
    const trackClicksCheckbox = document.getElementById('trackClicks');
    if (trackClicksCheckbox) {
        trackClicksCheckbox.addEventListener('change', function() {
            if (this.checked) {
                showToast('✓ Link clicks will be tracked', 'success');
                console.log('Tracking enabled: Link Clicks');
            } else {
                showToast('Link clicks tracking disabled', 'info');
                console.log('Tracking disabled: Link Clicks');
            }
        });
    }
    
    // Unsubscribe Link Checkbox
    const unsubscribeCheckbox = document.getElementById('enableUnsubscribe');
    if (unsubscribeCheckbox) {
        unsubscribeCheckbox.addEventListener('change', function() {
            if (this.checked) {
                showToast('✓ Unsubscribe link will be included', 'success');
                console.log('Unsubscribe link: Enabled');
            } else {
                showToast('⚠️ Warning: Unsubscribe link removed (may violate regulations)', 'error');
                console.log('Unsubscribe link: Disabled');
            }
        });
    }
});

// Show tracking summary before creating campaign
window.showTrackingSummary = function() {
    const trackOpens = document.getElementById('trackOpens').checked;
    const trackClicks = document.getElementById('trackClicks').checked;
    const includeUnsubscribe = document.getElementById('enableUnsubscribe').checked;
    
    const enabledFeatures = [];
    if (trackOpens) enabledFeatures.push('Email Opens');
    if (trackClicks) enabledFeatures.push('Link Clicks');
    if (includeUnsubscribe) enabledFeatures.push('Unsubscribe Link');
    
    if (enabledFeatures.length > 0) {
        console.log('Enabled tracking features:', enabledFeatures.join(', '));
    } else {
        console.log('No tracking features enabled');
    }
    
    return {
        trackOpens,
        trackClicks,
        includeUnsubscribe,
        summary: enabledFeatures.join(', ')
    };
};

// Update createEmailCampaign to show tracking summary
const originalCreateEmailCampaign = window.createEmailCampaign;
window.createEmailCampaign = function() {
    // Show tracking summary
    const trackingInfo = showTrackingSummary();
    
    // Continue with original function
    return originalCreateEmailCampaign();
};

// ===================================
// INTEGRATIONS CONNECTION
// ===================================

let currentIntegration = null;

// Integration Configuration
const integrationConfig = {
    hubspot: {
        name: 'HubSpot',
        subtitle: 'Connect your HubSpot CRM',
        features: [
            'Sync contacts and leads automatically',
            'Track email campaigns in HubSpot',
            'Create deals from qualified leads',
            'Update contact properties',
            'Trigger workflows based on events'
        ],
        fields: [
            { type: 'text', id: 'apiKey', label: 'API Key', placeholder: 'pat-na1-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', required: true, secret: true },
            { type: 'select', id: 'syncDirection', label: 'Sync Direction', options: ['Bashua → HubSpot', 'HubSpot → Bashua', 'Bi-directional'], required: true }
        ],
        instructions: {
            title: 'How to get your HubSpot API Key:',
            steps: [
                'Log in to your HubSpot account',
                'Go to Settings → Integrations → Private Apps',
                'Click "Create a private app"',
                'Give it a name and select required scopes',
                'Copy the API key'
            ]
        }
    },
    salesforce: {
        name: 'Salesforce',
        subtitle: 'Connect your Salesforce CRM',
        features: [
            'Sync leads and opportunities',
            'Update Salesforce records in real-time',
            'Create tasks and events',
            'Track campaign performance',
            'Custom field mapping'
        ],
        fields: [
            { type: 'text', id: 'instanceUrl', label: 'Instance URL', placeholder: 'https://yourinstance.salesforce.com', required: true },
            { type: 'text', id: 'clientId', label: 'Consumer Key', placeholder: 'Your connected app consumer key', required: true },
            { type: 'text', id: 'clientSecret', label: 'Consumer Secret', placeholder: 'Your connected app consumer secret', required: true, secret: true }
        ],
        instructions: {
            title: 'How to set up Salesforce connection:',
            steps: [
                'Log in to Salesforce Setup',
                'Go to Apps → App Manager → New Connected App',
                'Enable OAuth Settings',
                'Add callback URL: https://bashua.com/oauth/callback',
                'Copy Consumer Key and Secret'
            ]
        }
    },
    zapier: {
        name: 'Zapier',
        subtitle: 'Connect 5000+ apps',
        features: [
            'Create Zaps with any trigger',
            'Send data to 5000+ apps',
            'Multi-step workflows',
            'Filters and conditions',
            'Automatic retries'
        ],
        fields: [
            { type: 'text', id: 'webhookUrl', label: 'Webhook URL', placeholder: 'https://hooks.zapier.com/hooks/catch/...', required: true },
            { type: 'checkboxes', id: 'triggers', label: 'Select Triggers', options: ['New Lead', 'Campaign Sent', 'Email Opened', 'Link Clicked', 'Form Submitted'] }
        ],
        instructions: {
            title: 'How to connect Zapier:',
            steps: [
                'Log in to your Zapier account',
                'Create a new Zap',
                'Choose "Webhooks by Zapier" as trigger',
                'Select "Catch Hook"',
                'Copy the webhook URL provided',
                'Paste it here and select which events to send'
            ]
        }
    },
    'google-analytics': {
        name: 'Google Analytics',
        subtitle: 'Track campaign performance',
        features: [
            'Track email campaign clicks',
            'Monitor conversion rates',
            'View traffic sources',
            'Custom event tracking',
            'Real-time analytics'
        ],
        fields: [
            { type: 'text', id: 'trackingId', label: 'Tracking ID', placeholder: 'UA-XXXXXXXXX-X or G-XXXXXXXXXX', required: true },
            { type: 'text', id: 'propertyId', label: 'Property ID (GA4)', placeholder: 'G-XXXXXXXXXX', required: false },
            { type: 'checkbox', id: 'trackCampaigns', label: 'Automatically track email campaigns', checked: true }
        ],
        instructions: {
            title: 'How to find your Google Analytics ID:',
            steps: [
                'Log in to Google Analytics',
                'Go to Admin (gear icon)',
                'Select your Property',
                'Go to Property Settings',
                'Copy the Tracking ID or Measurement ID'
            ]
        }
    },
    stripe: {
        name: 'Stripe',
        subtitle: 'Accept payments & manage billing',
        features: [
            'Process payments automatically',
            'Track subscription revenue',
            'Manage customer billing',
            'Webhook notifications',
            'Invoice generation'
        ],
        fields: [
            { type: 'text', id: 'publishableKey', label: 'Publishable Key', placeholder: 'pk_live_...', required: true },
            { type: 'text', id: 'secretKey', label: 'Secret Key', placeholder: 'sk_live_...', required: true, secret: true },
            { type: 'select', id: 'environment', label: 'Environment', options: ['Test Mode', 'Live Mode'], required: true }
        ],
        instructions: {
            title: 'How to get your Stripe API keys:',
            steps: [
                'Log in to your Stripe Dashboard',
                'Go to Developers → API Keys',
                'Copy your Publishable key and Secret key',
                'Use Test keys for testing, Live keys for production',
                'Never share your Secret key publicly'
            ]
        }
    },
    teams: {
        name: 'Microsoft Teams',
        subtitle: 'Send notifications to your team',
        features: [
            'Real-time campaign notifications',
            'Lead alerts to channels',
            'Daily summary reports',
            'Custom message formatting',
            'Mention team members'
        ],
        fields: [
            { type: 'text', id: 'webhookUrl', label: 'Incoming Webhook URL', placeholder: 'https://outlook.office.com/webhook/...', required: true },
            { type: 'text', id: 'channelName', label: 'Channel Name', placeholder: 'Marketing', required: false },
            { type: 'checkboxes', id: 'notifications', label: 'Notify on', options: ['New Lead', 'Campaign Sent', 'Goal Achieved', 'Error Occurred'] }
        ],
        instructions: {
            title: 'How to create a Teams webhook:',
            steps: [
                'Open Microsoft Teams',
                'Go to the channel where you want notifications',
                'Click ••• → Connectors',
                'Find "Incoming Webhook" and click Configure',
                'Give it a name and upload an icon (optional)',
                'Copy the webhook URL'
            ]
        }
    }
};

// Open Connection Modal
window.connectIntegration = function(integrationId) {
    const config = integrationConfig[integrationId];
    if (!config) return;
    
    currentIntegration = integrationId;
    
    // Update modal title
    document.getElementById('connectionModalTitle').textContent = `Connect to ${config.name}`;
    document.getElementById('connectionModalSubtitle').textContent = config.subtitle;
    
    // Build form content
    const formContent = document.getElementById('connectionFormContent');
    formContent.innerHTML = `
        <!-- Features -->
        <div class="connection-feature-list">
            <h4>What you can do:</h4>
            <ul>
                ${config.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
        </div>
        
        <!-- Instructions -->
        <div class="connection-instructions">
            <h4>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
                ${config.instructions.title}
            </h4>
            <ol>
                ${config.instructions.steps.map(step => `<li>${step}</li>`).join('')}
            </ol>
        </div>
        
        <!-- Connection Fields -->
        ${config.fields.map((field, index) => renderConnectionField(field, index)).join('')}
    `;
    
    // Open modal
    document.getElementById('connectIntegrationModal').classList.add('active');
};

function renderConnectionField(field, index) {
    if (field.type === 'text') {
        return `
            <div class="connection-step">
                <label class="form-label">
                    ${field.label}
                    ${field.required ? '<span class="required">*</span>' : ''}
                </label>
                ${field.secret ? `
                    <div class="api-key-input-group">
                        <input type="password" class="form-input" id="${field.id}" placeholder="${field.placeholder}" ${field.required ? 'required' : ''}>
                        <button type="button" class="toggle-visibility-btn" onclick="togglePasswordVisibility('${field.id}')">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                        </button>
                    </div>
                ` : `
                    <input type="text" class="form-input" id="${field.id}" placeholder="${field.placeholder}" ${field.required ? 'required' : ''}>
                `}
            </div>
        `;
    } else if (field.type === 'select') {
        return `
            <div class="connection-step">
                <label class="form-label">
                    ${field.label}
                    ${field.required ? '<span class="required">*</span>' : ''}
                </label>
                <select class="form-input" id="${field.id}" ${field.required ? 'required' : ''}>
                    <option value="">Select...</option>
                    ${field.options.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
                </select>
            </div>
        `;
    } else if (field.type === 'checkbox') {
        return `
            <div class="connection-step">
                <label class="checkbox-option">
                    <input type="checkbox" id="${field.id}" ${field.checked ? 'checked' : ''}>
                    <span class="checkbox-label">${field.label}</span>
                </label>
            </div>
        `;
    } else if (field.type === 'checkboxes') {
        return `
            <div class="connection-step">
                <div class="connection-step-title">${field.label}</div>
                <div class="permissions-list">
                    ${field.options.map((opt, i) => `
                        <label class="checkbox-option">
                            <input type="checkbox" id="${field.id}_${i}" value="${opt}">
                            <span class="checkbox-label">${opt}</span>
                        </label>
                    `).join('')}
                </div>
            </div>
        `;
    }
    return '';
}

window.closeConnectionModal = function() {
    document.getElementById('connectIntegrationModal').classList.remove('active');
    currentIntegration = null;
};

window.togglePasswordVisibility = function(fieldId) {
    const input = document.getElementById(fieldId);
    input.type = input.type === 'password' ? 'text' : 'password';
};

window.confirmConnection = function() {
    if (!currentIntegration) return;
    
    const config = integrationConfig[currentIntegration];
    
    // Collect form data
    const formData = {};
    let valid = true;
    
    config.fields.forEach(field => {
        const element = document.getElementById(field.id);
        if (element) {
            if (field.required && !element.value) {
                valid = false;
                element.style.borderColor = 'var(--error)';
            } else {
                formData[field.id] = element.value;
                element.style.borderColor = '';
            }
        }
    });
    
    if (!valid) {
        showToast('Please fill in all required fields', 'error');
        return;
    }
    
    // Simulate connection
    showToast('Connecting to ' + config.name + '...', 'info');
    
    setTimeout(() => {
        showToast(`Successfully connected to ${config.name}!`, 'success');
        console.log('Connected integration:', currentIntegration, formData);
        closeConnectionModal();
        
        // In production:
        // POST /api/integrations/connect
        // { platform: currentIntegration, ...formData }
    }, 1500);
};

// ===================================
// BROWSE INTEGRATIONS, API KEYS, WEBHOOKS
// ===================================

// All Available Integrations (20+)
const allIntegrations = [
    // Already listed
    { id: 'hubspot', name: 'HubSpot', category: 'crm', description: 'CRM & marketing automation', connected: false },
    { id: 'salesforce', name: 'Salesforce', category: 'crm', description: 'Enterprise CRM platform', connected: false },
    { id: 'zapier', name: 'Zapier', category: 'productivity', description: 'Connect 5000+ apps', connected: false },
    { id: 'google-analytics', name: 'Google Analytics', category: 'analytics', description: 'Website analytics', connected: false },
    { id: 'stripe', name: 'Stripe', category: 'productivity', description: 'Payment processing', connected: false },
    { id: 'teams', name: 'Microsoft Teams', category: 'communication', description: 'Team collaboration', connected: false },
    // Additional
    { id: 'slack', name: 'Slack', category: 'communication', description: 'Team messaging', connected: true },
    { id: 'gmail', name: 'Gmail', category: 'communication', description: 'Email integration', connected: true },
    { id: 'linkedin', name: 'LinkedIn', category: 'communication', description: 'Social media', connected: true },
    { id: 'pipedrive', name: 'Pipedrive', category: 'crm', description: 'Sales CRM', connected: false },
    { id: 'monday', name: 'Monday.com', category: 'productivity', description: 'Work management', connected: false },
    { id: 'asana', name: 'Asana', category: 'productivity', description: 'Project management', connected: false },
    { id: 'trello', name: 'Trello', category: 'productivity', description: 'Task boards', connected: false },
    { id: 'intercom', name: 'Intercom', category: 'communication', description: 'Customer messaging', connected: false },
    { id: 'zendesk', name: 'Zendesk', category: 'communication', description: 'Customer support', connected: false },
    { id: 'mixpanel', name: 'Mixpanel', category: 'analytics', description: 'Product analytics', connected: false },
    { id: 'segment', name: 'Segment', category: 'analytics', description: 'Customer data platform', connected: false },
    { id: 'amplitude', name: 'Amplitude', category: 'analytics', description: 'Product intelligence', connected: false },
    { id: 'zoho', name: 'Zoho CRM', category: 'crm', description: 'Business CRM', connected: false },
    { id: 'freshworks', name: 'Freshworks', category: 'crm', description: 'Customer engagement', connected: false },
    { id: 'mailchimp', name: 'Mailchimp', category: 'communication', description: 'Email marketing', connected: false },
    { id: 'sendgrid', name: 'SendGrid', category: 'communication', description: 'Email delivery', connected: false }
];

// Browse Integrations
window.openBrowseIntegrations = function() {
    renderBrowseIntegrations('all');
    document.getElementById('browseIntegrationsModal').classList.add('active');
};

window.closeBrowseIntegrations = function() {
    document.getElementById('browseIntegrationsModal').classList.remove('active');
};

function renderBrowseIntegrations(category = 'all', searchTerm = '') {
    const grid = document.getElementById('browseIntegrationsGrid');
    
    let filtered = category === 'all' 
        ? allIntegrations 
        : allIntegrations.filter(i => i.category === category);
    
    if (searchTerm) {
        filtered = filtered.filter(i => 
            i.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            i.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    
    if (filtered.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                </svg>
                <h4>No integrations found</h4>
                <p>Try adjusting your search or filters</p>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = filtered.map(integration => `
        <div class="integration-card ${integration.connected ? 'connected' : 'available'}" data-category="${integration.category}">
            <div class="integration-status-badge ${integration.connected ? 'connected' : 'available'}">
                ${integration.connected ? `
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Connected
                ` : 'Available'}
            </div>
            <div class="integration-icon ${integration.id}">
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="12" r="10"></circle>
                </svg>
            </div>
            <div class="integration-info">
                <h4 class="integration-name">${integration.name}</h4>
                <p class="integration-description">${integration.description}</p>
            </div>
            ${integration.connected ? `
                <button class="btn-connect connected" disabled>Connected</button>
            ` : `
                <button class="btn-connect" onclick="connectIntegration('${integration.id}')">Connect</button>
            `}
        </div>
    `).join('');
}

window.filterByCategory = function(category) {
    document.querySelectorAll('.filter-chip').forEach(chip => {
        chip.classList.remove('active');
    });
    event.target.classList.add('active');
    
    const searchTerm = document.getElementById('integrationSearchInput').value;
    renderBrowseIntegrations(category, searchTerm);
};

window.filterIntegrations = function() {
    const searchTerm = document.getElementById('integrationSearchInput').value;
    const activeCategory = document.querySelector('.filter-chip.active').dataset.filter;
    renderBrowseIntegrations(activeCategory, searchTerm);
};

// API Keys Management
let apiKeys = [
    {
        id: 1,
        name: 'Production API Key',
        key: 'bsh_live_a8f2k9d0x7c4m5n1p3q6r8t2v4w7y9z1',
        description: 'Main production key',
        permissions: ['read', 'write'],
        created: '2024-11-15',
        lastUsed: '2024-12-26'
    },
    {
        id: 2,
        name: 'Development Key',
        key: 'bsh_test_k3n5p8q2r4s7t9u1v4w6x8y0z2a3c5d7',
        description: 'Testing and development',
        permissions: ['read'],
        created: '2024-12-01',
        lastUsed: '2024-12-20'
    }
];

window.openApiKeys = function() {
    renderApiKeys();
    document.getElementById('apiKeysModal').classList.add('active');
};

window.closeApiKeys = function() {
    document.getElementById('apiKeysModal').classList.remove('active');
};

function renderApiKeys() {
    const list = document.getElementById('apiKeysList');
    
    if (apiKeys.length === 0) {
        list.innerHTML = `
            <div class="empty-state">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path>
                </svg>
                <h4>No API keys yet</h4>
                <p>Create your first API key to get started</p>
            </div>
        `;
        return;
    }
    
    list.innerHTML = apiKeys.map(key => `
        <div class="api-key-item">
            <div class="api-key-info">
                <div class="api-key-name">${key.name}</div>
                <div class="api-key-details">
                    <span class="api-key-value">${key.key.substring(0, 20)}••••••••</span>
                    <span>Created ${key.created}</span>
                    <span>Last used ${key.lastUsed}</span>
                </div>
            </div>
            <div class="api-key-actions">
                <button class="btn-icon-small" onclick="copyApiKey('${key.key}')" title="Copy">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                </button>
                <button class="btn-icon-small danger" onclick="deleteApiKey(${key.id})" title="Delete">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                </button>
            </div>
        </div>
    `).join('');
}

window.createApiKey = function() {
    document.getElementById('createApiKeyModal').classList.add('active');
};

window.closeCreateApiKey = function() {
    document.getElementById('createApiKeyModal').classList.remove('active');
};

window.generateApiKey = function() {
    const name = document.getElementById('apiKeyName').value.trim();
    
    if (!name) {
        showToast('Please enter a key name', 'error');
        return;
    }
    
    const description = document.getElementById('apiKeyDescription').value.trim();
    const permissions = [];
    if (document.getElementById('perm_read').checked) permissions.push('read');
    if (document.getElementById('perm_write').checked) permissions.push('write');
    if (document.getElementById('perm_delete').checked) permissions.push('delete');
    
    // Generate random API key
    const prefix = 'bsh_live_';
    const randomKey = prefix + Array.from({length: 32}, () => 
        'abcdefghijklmnopqrstuvwxyz0123456789'[Math.floor(Math.random() * 36)]
    ).join('');
    
    const newKey = {
        id: apiKeys.length + 1,
        name,
        key: randomKey,
        description,
        permissions,
        created: new Date().toISOString().split('T')[0],
        lastUsed: 'Never'
    };
    
    apiKeys.push(newKey);
    
    closeCreateApiKey();
    renderApiKeys();
    
    showToast('API key created successfully!', 'success');
    console.log('New API key:', newKey);
    
    // In production:
    // POST /api/keys
    // { name, description, permissions }
};

window.copyApiKey = function(key) {
    navigator.clipboard.writeText(key).then(() => {
        showToast('API key copied to clipboard!', 'success');
    }).catch(() => {
        showToast('Failed to copy API key', 'error');
    });
};

window.deleteApiKey = function(keyId) {
    if (!confirm('Are you sure you want to delete this API key? This action cannot be undone.')) {
        return;
    }
    
    apiKeys = apiKeys.filter(k => k.id !== keyId);
    renderApiKeys();
    showToast('API key deleted', 'success');
    
    // In production:
    // DELETE /api/keys/:id
};

// Webhooks Management
let webhooks = [
    {
        id: 1,
        url: 'https://api.example.com/webhooks/new-lead',
        description: 'Send new leads to CRM',
        events: ['lead.created'],
        status: 'active',
        created: '2024-12-15',
        lastTriggered: '2024-12-26 10:30'
    },
    {
        id: 2,
        url: 'https://hooks.zapier.com/12345/catch',
        description: 'Zapier workflow trigger',
        events: ['campaign.sent', 'email.opened'],
        status: 'active',
        created: '2024-12-10',
        lastTriggered: '2024-12-26 09:15'
    }
];

window.createWebhook = function() {
    document.getElementById('createWebhookModal').classList.add('active');
};

window.closeCreateWebhook = function() {
    document.getElementById('createWebhookModal').classList.remove('active');
};

window.saveWebhook = function() {
    const url = document.getElementById('webhookUrl').value.trim();
    
    if (!url) {
        showToast('Please enter a webhook URL', 'error');
        return;
    }
    
    const description = document.getElementById('webhookDescription').value.trim();
    const events = [];
    if (document.getElementById('event_lead').checked) events.push('lead.created');
    if (document.getElementById('event_campaign').checked) events.push('campaign.sent');
    if (document.getElementById('event_email').checked) events.push('email.opened');
    if (document.getElementById('event_click').checked) events.push('link.clicked');
    
    const newWebhook = {
        id: webhooks.length + 1,
        url,
        description,
        events,
        status: 'active',
        created: new Date().toISOString().split('T')[0],
        lastTriggered: 'Never'
    };
    
    webhooks.push(newWebhook);
    
    closeCreateWebhook();
    showToast('Webhook created successfully!', 'success');
    console.log('New webhook:', newWebhook);
    
    // Update webhooks list in page (if visible)
    updateWebhooksList();
    
    // In production:
    // POST /api/webhooks
    // { url, description, events }
};

function updateWebhooksList() {
    const webhooksList = document.querySelector('.webhooks-list');
    if (!webhooksList) return;
    
    webhooksList.innerHTML = webhooks.map(webhook => `
        <div class="webhook-item">
            <div class="webhook-info">
                <div class="webhook-url">${webhook.url}</div>
                <div class="webhook-meta">
                    <span class="webhook-status active">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <circle cx="12" cy="12" r="10"></circle>
                        </svg>
                        Active
                    </span>
                    <span>Events: ${webhook.events.length}</span>
                    <span>Last triggered ${webhook.lastTriggered}</span>
                </div>
            </div>
            <div class="webhook-actions">
                <button class="btn-icon-small" onclick="testWebhook(${webhook.id})" title="Test">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                </button>
                <button class="btn-icon-small danger" onclick="deleteWebhook(${webhook.id})" title="Delete">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                </button>
            </div>
        </div>
    `).join('');
}

window.testWebhook = function(webhookId) {
    const webhook = webhooks.find(w => w.id === webhookId);
    if (!webhook) return;
    
    showToast('Sending test webhook...', 'info');
    
    setTimeout(() => {
        showToast('Test webhook sent successfully!', 'success');
        webhook.lastTriggered = new Date().toLocaleString();
        updateWebhooksList();
        
        // In production:
        // POST /api/webhooks/:id/test
    }, 1000);
};

window.deleteWebhook = function(webhookId) {
    if (!confirm('Delete this webhook?')) return;
    
    webhooks = webhooks.filter(w => w.id !== webhookId);
    updateWebhooksList();
    showToast('Webhook deleted', 'success');
    
    // In production:
    // DELETE /api/webhooks/:id
};

// Initialize event listeners
document.addEventListener('DOMContentLoaded', function() {
    const browseBtn = document.getElementById('browseIntegrationsBtn');
    if (browseBtn) {
        browseBtn.addEventListener('click', openBrowseIntegrations);
    }
    
    const apiKeysBtn = document.getElementById('viewApiKeysBtn');
    if (apiKeysBtn) {
        apiKeysBtn.addEventListener('click', openApiKeys);
    }
    
    // Initialize webhooks list on page load
    updateWebhooksList();
});