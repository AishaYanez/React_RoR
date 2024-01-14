const fetch = require('node-fetch');

async function fetchActivities() {
    const response = await fetch('http://localhost:4000/api/v1/activities');
    if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
    }
    const activities = await response.json();
    return activities;
}

async function beforeRender(req, res) {
    try {
        req.data.activities = await fetchActivities();
    } catch (error) {
        console.error('Error fetching activities:', error);
    }
}