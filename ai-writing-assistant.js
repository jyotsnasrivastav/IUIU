/**
 * AI-Powered Writing Assistant for SymbolsEmoji.com
 * Advanced content creation and optimization tools
 */

class AIWritingAssistant {
    constructor() {
        this.contentTemplates = this.initializeTemplates();
        this.writingStyles = ['informative', 'casual', 'professional', 'creative'];
        this.toneOptions = ['friendly', 'authoritative', 'playful', 'educational'];
        this.init();
    }
    
    init() {
        console.log('✍️ AI Writing Assistant initialized');
    }
    
    /**
     * Generate content based on parameters
     * @param {Object} params - Content generation parameters
     * @returns {Object} Generated content
     */
    generateContent(params) {
        const {
            contentType = 'page',
            topic = '',
            style = 'informative',
            tone = 'friendly',
            targetLength = 500,
            keywords = [],
            audience = 'general'
        } = params;
        
        console.log(`✍️ Generating ${contentType} content for: ${topic}`);
        
        const content = {
            title: this.generateTitle(topic, contentType, style),
            introduction: this.generateIntroduction(topic, tone, keywords),
            mainContent: this.generateMainContent(topic, contentType, targetLength, keywords),
            conclusion: this.generateConclusion(topic, tone),
            metadata: {
                wordCount: 0,
                keywordDensity: this.calculateKeywordDensity(keywords, ''),
                readabilityScore: 0,
                seoScore: 0
            }
        };
        
        // Calculate metadata
        const fullText = `${content.title} ${content.introduction} ${content.mainContent} ${content.conclusion}`;
        content.metadata.wordCount = this.countWords(fullText);
        content.metadata.keywordDensity = this.calculateKeywordDensity(keywords, fullText);
        content.metadata.readabilityScore = this.calculateReadabilityScore(fullText);
        content.metadata.seoScore = this.calculateSEOScore(content, keywords);
        
        return content;
    }
    
    generateTitle(topic, contentType, style) {
        const templates = this.contentTemplates.titles[contentType] || this.contentTemplates.titles.default;
        const template = templates[Math.floor(Math.random() * templates.length)];
        
        return template.replace('{topic}', this.capitalizeFirst(topic));
    }
    
    generateIntroduction(topic, tone, keywords) {
        const templates = this.contentTemplates.introductions[tone] || this.contentTemplates.introductions.friendly;
        const template = templates[Math.floor(Math.random() * templates.length)];
        
        let intro = template.replace('{topic}', topic);
        
        // Naturally incorporate keywords
        if (keywords.length > 0) {
            const primaryKeyword = keywords[0];
            if (!intro.toLowerCase().includes(primaryKeyword.toLowerCase())) {
                intro = intro.replace(topic, `${topic} ${primaryKeyword}`);
            }
        }
        
        return intro;
    }
    
    generateMainContent(topic, contentType, targetLength, keywords) {
        const sections = this.contentTemplates.sections[contentType] || this.contentTemplates.sections.default;
        let content = '';
        
        sections.forEach(section => {
            content += this.generateSection(section, topic, keywords) + '\n\n';
        });
        
        // Adjust length if needed
        if (this.countWords(content) < targetLength) {
            content += this.generateAdditionalContent(topic, keywords, targetLength - this.countWords(content));
        }
        
        return content.trim();
    }
    
    generateSection(sectionType, topic, keywords) {
        const generators = {
            overview: () => this.generateOverviewSection(topic, keywords),
            usage: () => this.generateUsageSection(topic, keywords),
            examples: () => this.generateExamplesSection(topic, keywords),
            tips: () => this.generateTipsSection(topic, keywords),
            faq: () => this.generateFAQSection(topic, keywords),
            collection: () => this.generateCollectionSection(topic, keywords),
            tutorial: () => this.generateTutorialSection(topic, keywords)
        };
        
        return generators[sectionType] ? generators[sectionType]() : this.generateGenericSection(sectionType, topic);
    }
    
    generateOverviewSection(topic, keywords) {
        return `## What are ${this.capitalizeFirst(topic)} Symbols?

${this.capitalizeFirst(topic)} symbols are special Unicode characters that represent ${topic}-related concepts and designs. These symbols are widely used across digital platforms for creative expression, social media posts, and text decoration.

Our collection includes a variety of ${topic} symbols that you can easily copy and paste into any application. Whether you're looking for simple ${topic} characters or more elaborate decorative elements, you'll find the perfect symbol for your needs.`;
    }
    
    generateUsageSection(topic, keywords) {
        return `## How to Use ${this.capitalizeFirst(topic)} Symbols

Using ${topic} symbols is simple and straightforward:

1. **Browse the Collection**: Scroll through our ${topic} symbol collection below
2. **Click to Copy**: Simply click on any symbol to copy it to your clipboard
3. **Paste Anywhere**: Use Ctrl+V (or Cmd+V on Mac) to paste the symbol

### Popular Uses for ${this.capitalizeFirst(topic)} Symbols:
- Social media posts and bios
- Text messages and chat applications
- Email signatures and headers
- Creative writing and storytelling
- Website design and decoration`;
    }
    
    generateExamplesSection(topic, keywords) {
        const examples = this.getTopicExamples(topic);
        
        return `## ${this.capitalizeFirst(topic)} Symbol Examples

Here are some popular ways to use ${topic} symbols in your content:

### Social Media Examples:
${examples.social.map(ex => `- ${ex}`).join('\n')}

### Creative Text Examples:
${examples.creative.map(ex => `- ${ex}`).join('\n')}

### Decorative Examples:
${examples.decorative.map(ex => `- ${ex}`).join('\n')}`;
    }
    
    generateTipsSection(topic, keywords) {
        return `## Pro Tips for Using ${this.capitalizeFirst(topic)} Symbols

### Design Tips:
- **Balance is Key**: Don't overuse symbols - they should enhance, not overwhelm your text
- **Context Matters**: Choose symbols that match your content's tone and purpose
- **Platform Compatibility**: Test symbols on different devices to ensure they display correctly

### Creative Ideas:
- Combine multiple ${topic} symbols to create unique patterns
- Use symbols as bullet points for lists
- Create visual separators between sections
- Add symbols to headers for visual appeal

### Accessibility Considerations:
- Provide alt text when using symbols in images
- Consider how screen readers interpret symbols
- Use symbols sparingly in professional communications`;
    }
    
    generateFAQSection(topic, keywords) {
        return `## Frequently Asked Questions

### Q: Are ${topic} symbols free to use?
A: Yes! All ${topic} symbols in our collection are free to copy and paste. They are Unicode characters that are part of the universal character set.

### Q: Do ${topic} symbols work on all devices?
A: Most modern devices and platforms support Unicode symbols. However, some older systems might display symbols differently or not at all.

### Q: Can I use ${topic} symbols commercially?
A: Unicode symbols are generally free for commercial use. However, always check the specific terms for your use case.

### Q: How do I copy ${topic} symbols on mobile?
A: On mobile devices, tap and hold the symbol, then select "Copy" from the menu that appears.

### Q: Why do some symbols appear as squares?
A: This usually means your device doesn't have the font needed to display that particular symbol. Try using a different device or updating your system.`;
    }
    
    generateCollectionSection(topic, keywords) {
        return `## ${this.capitalizeFirst(topic)} Symbol Collection

Below you'll find our comprehensive collection of ${topic} symbols. Each symbol is carefully selected for quality and compatibility across different platforms.

### Symbol Categories:
- **Basic ${this.capitalizeFirst(topic)} Symbols**: Simple, clean designs perfect for everyday use
- **Decorative ${this.capitalizeFirst(topic)} Elements**: Ornate symbols for special occasions
- **Minimalist ${this.capitalizeFirst(topic)} Icons**: Clean, modern symbols for professional use
- **Artistic ${this.capitalizeFirst(topic)} Designs**: Creative symbols for artistic projects

Click on any symbol below to copy it instantly to your clipboard!`;
    }
    
    generateTutorialSection(topic, keywords) {
        return `## Step-by-Step Tutorial: Using ${this.capitalizeFirst(topic)} Symbols

### Step 1: Choose Your Symbol
Browse through our ${topic} symbol collection and find the perfect symbol for your needs. Consider the context where you'll use it and choose accordingly.

### Step 2: Copy the Symbol
Click on your chosen symbol. It will be automatically copied to your clipboard. You'll see a confirmation message when the copy is successful.

### Step 3: Navigate to Your Destination
Go to the application, website, or document where you want to use the symbol. This could be social media, email, messaging apps, or any text editor.

### Step 4: Paste the Symbol
Use the paste command (Ctrl+V on Windows, Cmd+V on Mac, or tap and hold then select Paste on mobile) to insert your ${topic} symbol.

### Step 5: Adjust and Style
You can often change the size, color, or style of the symbol using your application's formatting tools, just like regular text.`;
    }
    
    generateConclusion(topic, tone) {
        const conclusions = {
            friendly: `We hope you found the perfect ${topic} symbols for your creative projects! Our collection is regularly updated with new symbols, so be sure to bookmark this page and check back often. Happy symbol hunting! 🎉`,
            
            professional: `Our ${topic} symbol collection provides a comprehensive resource for your design and communication needs. These Unicode characters offer reliable cross-platform compatibility and professional presentation quality.`,
            
            educational: `Understanding and using ${topic} symbols effectively can enhance your digital communication. These symbols represent a rich tradition of visual language that continues to evolve in our digital age.`,
            
            playful: `Have fun exploring our amazing ${topic} symbol collection! Mix, match, and create something uniquely yours. The only limit is your imagination! ✨`
        };
        
        return conclusions[tone] || conclusions.friendly;
    }
    
    generateAdditionalContent(topic, keywords, targetWords) {
        const additionalSections = [
            `### ${this.capitalizeFirst(topic)} Symbol History
The use of ${topic} symbols dates back centuries, with modern digital representations building on traditional iconography. Today's Unicode standard ensures these symbols can be shared across all digital platforms.`,
            
            `### Cultural Significance
${this.capitalizeFirst(topic)} symbols carry different meanings across cultures. Understanding these cultural contexts can help you use symbols more effectively and respectfully in your communications.`,
            
            `### Technical Details
All ${topic} symbols in our collection are Unicode characters, which means they're standardized across different systems and platforms. This ensures consistent display and functionality.`
        ];
        
        return additionalSections.join('\n\n');
    }
    
    getTopicExamples(topic) {
        const exampleMap = {
            heart: {
                social: ['❤️ Love this post!', '💕 Feeling grateful today', '💖 Best friends forever'],
                creative: ['Love ❤️ conquers all', 'My ❤️ belongs to you', 'Follow your ❤️'],
                decorative: ['━━━ ❤️ ━━━', '✧･ﾟ: *✧･ﾟ:* ❤️ *:･ﾟ✧*:･ﾟ✧', '❤️ ═══ ❤️ ═══ ❤️']
            },
            star: {
                social: ['⭐ Amazing performance!', '✨ Feeling magical', '🌟 Star of the show'],
                creative: ['Reach for the ⭐', 'You are my ✨', 'Born to be a 🌟'],
                decorative: ['━━━ ⭐ ━━━', '✧･ﾟ: *✧･ﾟ:* ⭐ *:･ﾟ✧*:･ﾟ✧', '⭐ ═══ ⭐ ═══ ⭐']
            },
            default: {
                social: [`${topic} symbols in action!`, `Love using ${topic} symbols`, `${topic} makes everything better`],
                creative: [`The power of ${topic}`, `${topic} inspiration`, `${topic} creativity`],
                decorative: [`━━━ ${topic} ━━━`, `✧･ﾟ: *${topic}*:･ﾟ✧`, `${topic} ═══ ${topic}`]
            }
        };
        
        return exampleMap[topic] || exampleMap.default;
    }
    
    // ==================== CONTENT ANALYSIS METHODS ====================
    
    countWords(text) {
        return text.split(/\s+/).filter(word => word.length > 0).length;
    }
    
    calculateKeywordDensity(keywords, text) {
        if (!keywords.length || !text) return 0;
        
        const wordCount = this.countWords(text);
        const keywordCount = keywords.reduce((count, keyword) => {
            const regex = new RegExp(keyword, 'gi');
            const matches = text.match(regex);
            return count + (matches ? matches.length : 0);
        }, 0);
        
        return ((keywordCount / wordCount) * 100).toFixed(2);
    }
    
    calculateReadabilityScore(text) {
        // Simplified Flesch Reading Ease calculation
        const sentences = text.split(/[.!?]+/).length - 1;
        const words = this.countWords(text);
        const syllables = this.countSyllables(text);
        
        if (sentences === 0 || words === 0) return 0;
        
        const score = 206.835 - (1.015 * (words / sentences)) - (84.6 * (syllables / words));
        return Math.max(0, Math.min(100, Math.round(score)));
    }
    
    countSyllables(text) {
        // Simplified syllable counting
        return text.toLowerCase()
            .replace(/[^a-z]/g, '')
            .replace(/[aeiouy]+/g, 'a')
            .replace(/[^a]/g, '')
            .length || 1;
    }
    
    calculateSEOScore(content, keywords) {
        let score = 0;
        const fullText = `${content.title} ${content.introduction} ${content.mainContent} ${content.conclusion}`;
        
        // Title optimization (20 points)
        if (content.title.length >= 30 && content.title.length <= 60) score += 10;
        if (keywords.some(keyword => content.title.toLowerCase().includes(keyword.toLowerCase()))) score += 10;
        
        // Content length (20 points)
        const wordCount = this.countWords(fullText);
        if (wordCount >= 300) score += 10;
        if (wordCount >= 500) score += 10;
        
        // Keyword usage (30 points)
        const keywordDensity = parseFloat(this.calculateKeywordDensity(keywords, fullText));
        if (keywordDensity >= 1 && keywordDensity <= 3) score += 15;
        if (keywords.some(keyword => content.introduction.toLowerCase().includes(keyword.toLowerCase()))) score += 15;
        
        // Structure (30 points)
        if (content.mainContent.includes('##')) score += 15; // Has headings
        if (content.mainContent.includes('###')) score += 15; // Has subheadings
        
        return score;
    }
    
    // ==================== CONTENT TEMPLATES ====================
    
    initializeTemplates() {
        return {
            titles: {
                page: [
                    '{topic} Symbols ❦ Copy & Paste {topic} Collection',
                    'Beautiful {topic} Symbols to Copy and Paste',
                    '{topic} Characters & Symbols - Free Collection',
                    'Cool {topic} Symbols ❦ Unicode {topic} Characters'
                ],
                blog: [
                    'How to Use {topic} Symbols Effectively',
                    'The Ultimate Guide to {topic} Symbols',
                    'Creative Ways to Use {topic} Symbols',
                    'Everything You Need to Know About {topic} Symbols'
                ],
                guide: [
                    'Complete {topic} Symbol Reference Guide',
                    '{topic} Symbols: A Comprehensive Tutorial',
                    'Mastering {topic} Symbols: Step-by-Step Guide',
                    'The Definitive {topic} Symbol Handbook'
                ],
                default: [
                    '{topic} Symbols Collection',
                    'All About {topic} Symbols',
                    '{topic} Symbol Resource'
                ]
            },
            
            introductions: {
                friendly: [
                    'Welcome to our amazing collection of {topic} symbols! Whether you\'re looking to add some flair to your social media posts or need the perfect symbol for your creative project, you\'ve come to the right place.',
                    'Looking for the perfect {topic} symbols? You\'re in luck! Our comprehensive collection features hundreds of beautiful {topic} characters that you can copy and paste instantly.',
                    'Discover the world of {topic} symbols with our easy-to-use collection. From simple designs to elaborate decorative elements, we have everything you need to make your text stand out.'
                ],
                professional: [
                    'This comprehensive resource provides a curated collection of {topic} symbols for professional and creative applications.',
                    'Our {topic} symbol database offers standardized Unicode characters suitable for various digital communication needs.',
                    'Access a professional-grade collection of {topic} symbols designed for cross-platform compatibility and consistent presentation.'
                ],
                educational: [
                    'Understanding {topic} symbols and their applications can enhance your digital communication skills.',
                    'This educational resource explores the world of {topic} symbols, their origins, and practical applications.',
                    'Learn about {topic} symbols, their cultural significance, and how to use them effectively in modern communication.'
                ],
                playful: [
                    'Get ready to dive into the fun world of {topic} symbols! ✨',
                    'Time to spice up your messages with awesome {topic} symbols! 🎉',
                    'Let\'s explore the magical universe of {topic} symbols together! 🌟'
                ]
            },
            
            sections: {
                page: ['overview', 'collection', 'usage', 'faq'],
                blog: ['overview', 'examples', 'tips', 'tutorial'],
                guide: ['overview', 'tutorial', 'examples', 'tips', 'faq'],
                collection: ['overview', 'collection', 'usage'],
                default: ['overview', 'usage', 'examples']
            }
        };
    }
    
    // ==================== UTILITY METHODS ====================
    
    capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    
    /**
     * Optimize existing content
     * @param {string} content - Existing content
     * @param {Array} keywords - Target keywords
     * @returns {Object} Optimization suggestions
     */
    optimizeContent(content, keywords = []) {
        const analysis = {
            currentScore: this.calculateSEOScore({ title: '', introduction: content, mainContent: '', conclusion: '' }, keywords),
            suggestions: [],
            improvements: []
        };
        
        // Analyze and suggest improvements
        const wordCount = this.countWords(content);
        if (wordCount < 300) {
            analysis.suggestions.push('Increase content length to at least 300 words for better SEO');
        }
        
        const keywordDensity = parseFloat(this.calculateKeywordDensity(keywords, content));
        if (keywordDensity < 1) {
            analysis.suggestions.push('Increase keyword density to 1-3% for better optimization');
        } else if (keywordDensity > 3) {
            analysis.suggestions.push('Reduce keyword density to avoid over-optimization');
        }
        
        if (!content.includes('##')) {
            analysis.suggestions.push('Add headings (H2, H3) to improve content structure');
        }
        
        const readabilityScore = this.calculateReadabilityScore(content);
        if (readabilityScore < 60) {
            analysis.suggestions.push('Improve readability by using shorter sentences and simpler words');
        }
        
        return analysis;
    }
}

// Topic Clustering Engine
class TopicClusteringEngine {
    constructor() {
        this.clusters = new Map();
        this.relationships = new Map();
        this.init();
    }
    
    init() {
        console.log('🔗 Topic Clustering Engine initialized');
    }
    
    /**
     * Create topic clusters from keywords
     * @param {Array} keywords - List of keywords to cluster
     * @param {Object} options - Clustering options
     * @returns {Object} Clustered topics
     */
    createTopicClusters(keywords, options = {}) {
        const {
            maxClusters = 10,
            minClusterSize = 3,
            similarity = 0.7
        } = options;
        
        console.log(`🔗 Creating topic clusters from ${keywords.length} keywords`);
        
        const clusters = this.performClustering(keywords, similarity);
        const filteredClusters = this.filterClusters(clusters, minClusterSize);
        const namedClusters = this.nameCluster(filteredClusters);
        
        return {
            clusters: namedClusters,
            relationships: this.findClusterRelationships(namedClusters),
            contentStrategy: this.generateContentStrategy(namedClusters),
            pillarPages: this.identifyPillarPages(namedClusters)
        };
    }
    
    performClustering(keywords, similarity) {
        const clusters = [];
        const processed = new Set();
        
        keywords.forEach(keyword => {
            if (processed.has(keyword)) return;
            
            const cluster = [keyword];
            processed.add(keyword);
            
            keywords.forEach(otherKeyword => {
                if (processed.has(otherKeyword)) return;
                
                if (this.calculateSimilarity(keyword, otherKeyword) >= similarity) {
                    cluster.push(otherKeyword);
                    processed.add(otherKeyword);
                }
            });
            
            clusters.push(cluster);
        });
        
        return clusters;
    }
    
    calculateSimilarity(keyword1, keyword2) {
        const words1 = keyword1.toLowerCase().split(' ');
        const words2 = keyword2.toLowerCase().split(' ');
        
        const commonWords = words1.filter(word => words2.includes(word));
        const totalWords = new Set([...words1, ...words2]).size;
        
        return commonWords.length / totalWords;
    }
    
    filterClusters(clusters, minSize) {
        return clusters.filter(cluster => cluster.length >= minSize);
    }
    
    nameCluster(clusters) {
        return clusters.map((cluster, index) => {
            const name = this.generateClusterName(cluster);
            return {
                id: `cluster_${index + 1}`,
                name,
                keywords: cluster,
                size: cluster.length,
                primaryKeyword: cluster[0],
                difficulty: this.estimateClusterDifficulty(cluster),
                opportunity: this.assessClusterOpportunity(cluster)
            };
        });
    }
    
    generateClusterName(cluster) {
        // Find the most common words across the cluster
        const wordFreq = new Map();
        
        cluster.forEach(keyword => {
            keyword.toLowerCase().split(' ').forEach(word => {
                if (word.length > 2) { // Ignore short words
                    wordFreq.set(word, (wordFreq.get(word) || 0) + 1);
                }
            });
        });
        
        // Get the most frequent word
        let maxFreq = 0;
        let clusterName = cluster[0];
        
        wordFreq.forEach((freq, word) => {
            if (freq > maxFreq) {
                maxFreq = freq;
                clusterName = word;
            }
        });
        
        return this.capitalizeFirst(clusterName);
    }
    
    findClusterRelationships(clusters) {
        const relationships = [];
        
        for (let i = 0; i < clusters.length; i++) {
            for (let j = i + 1; j < clusters.length; j++) {
                const similarity = this.calculateClusterSimilarity(clusters[i], clusters[j]);
                
                if (similarity > 0.3) {
                    relationships.push({
                        cluster1: clusters[i].name,
                        cluster2: clusters[j].name,
                        similarity,
                        relationship: this.determineRelationshipType(similarity),
                        linkingOpportunity: this.suggestLinkingStrategy(clusters[i], clusters[j])
                    });
                }
            }
        }
        
        return relationships;
    }
    
    calculateClusterSimilarity(cluster1, cluster2) {
        const allKeywords1 = cluster1.keywords.join(' ').toLowerCase();
        const allKeywords2 = cluster2.keywords.join(' ').toLowerCase();
        
        return this.calculateSimilarity(allKeywords1, allKeywords2);
    }
    
    determineRelationshipType(similarity) {
        if (similarity > 0.7) return 'strong';
        if (similarity > 0.5) return 'moderate';
        return 'weak';
    }
    
    suggestLinkingStrategy(cluster1, cluster2) {
        return {
            strategy: 'internal_linking',
            suggestion: `Link ${cluster1.name} content to ${cluster2.name} content`,
            anchorText: `${cluster2.primaryKeyword}`,
            context: 'related_topics_section'
        };
    }
    
    generateContentStrategy(clusters) {
        return clusters.map(cluster => ({
            cluster: cluster.name,
            contentTypes: this.suggestContentTypes(cluster),
            pillarContent: this.suggestPillarContent(cluster),
            supportingContent: this.suggestSupportingContent(cluster),
            internalLinking: this.suggestInternalLinking(cluster),
            priority: this.calculateContentPriority(cluster)
        }));
    }
    
    suggestContentTypes(cluster) {
        const types = [];
        
        if (cluster.size >= 5) {
            types.push('comprehensive_guide', 'pillar_page');
        }
        
        types.push('collection_page', 'tutorial');
        
        if (cluster.keywords.some(k => k.includes('how to'))) {
            types.push('how_to_guide');
        }
        
        if (cluster.keywords.some(k => k.includes('best') || k.includes('top'))) {
            types.push('listicle');
        }
        
        return types;
    }
    
    suggestPillarContent(cluster) {
        return {
            title: `Complete Guide to ${cluster.name} Symbols`,
            url: `${cluster.name.toLowerCase().replace(' ', '-')}-symbols-guide.html`,
            targetKeywords: cluster.keywords.slice(0, 3),
            estimatedLength: '2000-3000 words'
        };
    }
    
    suggestSupportingContent(cluster) {
        return cluster.keywords.slice(1).map(keyword => ({
            title: `${this.capitalizeFirst(keyword)} - Quick Reference`,
            url: `${keyword.replace(' ', '-')}.html`,
            targetKeyword: keyword,
            estimatedLength: '500-800 words',
            linksToPillar: true
        }));
    }
    
    suggestInternalLinking(cluster) {
        return {
            hubPage: cluster.name,
            spokePages: cluster.keywords.slice(1),
            linkingPattern: 'hub_and_spoke',
            anchorTextVariations: this.generateAnchorTextVariations(cluster.keywords)
        };
    }
    
    generateAnchorTextVariations(keywords) {
        return keywords.flatMap(keyword => [
            keyword,
            `${keyword} symbols`,
            `${keyword} collection`,
            `learn about ${keyword}`
        ]);
    }
    
    calculateContentPriority(cluster) {
        let priority = cluster.size * 10; // Base on cluster size
        
        // Boost for high-opportunity keywords
        if (cluster.opportunity === 'high') priority += 20;
        
        // Boost for low difficulty
        if (cluster.difficulty === 'low') priority += 15;
        
        // Boost for commercial intent
        if (cluster.keywords.some(k => k.includes('buy') || k.includes('best'))) {
            priority += 10;
        }
        
        return Math.min(priority, 100);
    }
    
    identifyPillarPages(clusters) {
        return clusters
            .filter(cluster => cluster.size >= 5)
            .sort((a, b) => b.size - a.size)
            .slice(0, 5)
            .map(cluster => ({
                topic: cluster.name,
                pillarKeyword: cluster.primaryKeyword,
                supportingKeywords: cluster.keywords.slice(1),
                estimatedTraffic: cluster.size * 500,
                contentDepth: 'comprehensive',
                internalLinks: cluster.keywords.length - 1
            }));
    }
    
    estimateClusterDifficulty(cluster) {
        // Simple difficulty estimation based on keyword characteristics
        const avgLength = cluster.reduce((sum, keyword) => sum + keyword.length, 0) / cluster.length;
        
        if (avgLength > 20) return 'low';
        if (avgLength > 15) return 'medium';
        return 'high';
    }
    
    assessClusterOpportunity(cluster) {
        // Assess opportunity based on cluster characteristics
        const hasLongTail = cluster.some(k => k.split(' ').length > 3);
        const hasCommercial = cluster.some(k => k.includes('best') || k.includes('free'));
        
        if (hasLongTail && hasCommercial) return 'high';
        if (hasLongTail || hasCommercial) return 'medium';
        return 'low';
    }
    
    capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}

// Initialize engines
const writingAssistant = new AIWritingAssistant();
const topicClustering = new TopicClusteringEngine();

console.log('✅ AI Writing Assistant and Topic Clustering engines loaded');
