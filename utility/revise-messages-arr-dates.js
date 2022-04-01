"use strict";

/**
 * @param {object[]} messagesArr 
 * @returns {object[]}
 */
function reviseMessagesArrDates(messagesArr) {
    const dateFormatterObj = new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeStyle: "short" });
    const revisedMessages = messagesArr.map((messageObj) => {
        const formattedDate = dateFormatterObj.format(messageObj.createdAt);

        return {
            ...messageObj,
            createdAt: formattedDate
        };
    });

    return revisedMessages;
}

module.exports = { reviseMessagesArrDates };