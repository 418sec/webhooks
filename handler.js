"use strict";

module.exports.router = async (event) => {
    const payload = JSON.parse(event.body.payload);
    // Check for explicitly unsupported events
    if (
        payload.repository.isPrivate ||
        payload.repository.fullName === "418sec/huntr" ||
        payload.repository.fullName === "418sec/.github"
    ) {
        console.log("Unsupported webhook");
    }

    // Check if it's a "fix submitted" event
    else if (payload.action === "opened") {
        /* Invoke fix-submitted.js */
    }

    // Check if it's a "fix accepted" event
    else if (payload.action === "closed" && payload.pull_request.merged) {
        /* Invoke fix-accepted.js */
    }

    // Check if it's a "fix rejected" event
    else if (
        payload.action === "closed" &&
        !payload.pull_request.merged &&
        payload.sender.login !== payload.pull_request.user.login
    ) {
        /* Invoke fix-rejected.js */
    }

    // Check if it's a "fix withdrawn" event
    else if (
        payload.action === "closed" &&
        !payload.pull_request.merged &&
        payload.sender.login === payload.pull_request.user.login
    ) {
        /* Invoke fix-withdrawn.js */
    }

    // Fallback catch-all
    else {
        console.log("Unrecognised webhook");
    }

    return {
        statusCode: 200,
        body: JSON.stringify(
            {
                message:
                    "Go Serverless v1.0! Your function executed successfully!",
                input: event
            },
            null,
            2
        )
    };
};
