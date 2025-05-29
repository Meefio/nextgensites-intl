/**
 * Sanity Webhooks Setup Script
 * 
 * This script helps create webhooks in Sanity that trigger when content changes.
 * These webhooks can be used to integrate with n8n for automating content workflows.
 * 
 * Usage:
 * - Update the configuration variables below
 * - Run with: node scripts/sanity-webhooks-setup.js
 * 
 * Requirements:
 * - @sanity/client package
 * - SANITY_STUDIO_API_TOKEN environment variable (with tokens:manage scope)
 */

// Import required packages
const {createClient} = require('@sanity/client');
const readline = require('readline');

// Configuration
const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiToken: process.env.SANITY_STUDIO_API_TOKEN, // Token with tokens:manage scope
};

// Create Sanity client
const client = createClient({
  projectId: config.projectId,
  dataset: config.dataset,
  token: config.apiToken,
  useCdn: false,
});

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/**
 * Create a webhook for posts
 * @param {string} url The webhook URL to send events to
 */
async function createPostWebhook(url) {
  try {
    // Create the webhook
    const response = await client.request({
      method: 'POST',
      uri: `/projects/${config.projectId}/hooks`,
      body: {
        name: 'Post Content Webhook (n8n)',
        description: 'Triggers when posts are created, updated, or deleted',
        url: url,
        dataset: config.dataset,
        projectId: config.projectId,
        filter: {
          // Filter for document operations on posts
          filter: "_type == 'post'",
          channels: ['mutation'],
          includeResult: true,
        },
        headers: {
          'Content-Type': 'application/json'
        },
        httpMethod: 'POST',
        includeDrafts: false, // Only trigger on published content
        enabled: true
      }
    });

    console.log('✅ Webhook created successfully!');
    console.log('Webhook ID:', response.id);
    console.log(`\nHere's a sample webhook payload that will be sent to ${url}:`);
    console.log(`
{
  "ids": {
    "created": ["abc123"],  // IDs of created documents
    "updated": [],          // IDs of updated documents
    "deleted": []           // IDs of deleted documents
  },
  "transaction": {
    "id": "xyz789"          // Transaction ID
  },
  "result": {               // The actual document data
    "_id": "abc123",
    "_type": "post",
    "title": "Sample Post Title",
    "slug": {
      "en": { "current": "sample-post-title" },
      "pl": { "current": "przykladowy-tytul-postu" }
    },
    "language": "en",
    "body": [...],
    "publishedAt": "2025-05-15T12:00:00Z"
  }
}
`);

    console.log('\n-------------------------------');
    console.log('n8n Integration Instructions:');
    console.log('-------------------------------');
    console.log('1. Create a new workflow in n8n');
    console.log('2. Add a "Webhook" node as trigger');
    console.log('3. Configure it to use the POST method');
    console.log('4. Copy the webhook URL from n8n and use it for this script');
    console.log('5. Add a "Sanity" node to create/update content if needed');
    console.log('6. Add a "HTTP Request" node to trigger Next.js revalidation');
    console.log('\nExample Next.js revalidation URL structure:');
    console.log('https://nextgensites.pl/api/revalidate?secret=YOUR_SECRET&path=/baza-wiedzy');
    console.log('\nThis will trigger revalidation of your blog pages when content changes.');

  } catch (error) {
    console.error('❌ Failed to create webhook:', error.message);
    if (error.response) {
      console.error('Response:', error.response.body);
    }
  }
}

/**
 * Main function to set up Sanity webhooks
 */
async function main() {
  console.log('🔧 Sanity Webhooks Setup');
  console.log('========================\n');

  // Check if API token is available
  if (!config.apiToken) {
    console.error('❌ Error: SANITY_STUDIO_API_TOKEN environment variable is not set.');
    console.log('\nTo create a token:');
    console.log('1. Go to https://www.sanity.io/manage/project/[PROJECT_ID]');
    console.log('2. Navigate to API > Tokens');
    console.log('3. Create a new token with "tokens:manage" scope');
    console.log('4. Set it as an environment variable: export SANITY_STUDIO_API_TOKEN=your_token');
    process.exit(1);
  }

  // Ask for the webhook URL
  rl.question('Enter your n8n webhook URL: ', async (webhookUrl) => {
    if (!webhookUrl || !webhookUrl.startsWith('http')) {
      console.error('❌ Invalid webhook URL. It should start with http:// or https://');
      rl.close();
      return;
    }

    await createPostWebhook(webhookUrl);
    rl.close();
  });
}

// Run the script
main(); 
