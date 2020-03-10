"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var definedEngines_1 = require("../config/definedEngines");
exports.default = new /** @class */ (function () {
    function EventHandler() {
        this.events = definedEngines_1.default.events;
    }
    /**
     *
     *
     * @param event
     */
    EventHandler.prototype.addEvent = function (event) {
        this.events.push(event);
    };
    /**
     *
     * @param client
     */
    EventHandler.prototype.loadEvents = function (client) {
        this.events.forEach(function (e) {
            return client.on(e.name, function (event1, event2) {
                return e.onEvent(event1);
            });
        });
        client.on('raw', function (packet) {
            if (!['MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE'].includes(packet.t))
                return;
            var channel = client.channels.get(packet.d.channel_id);
            if (channel == null || channel.messages.has(packet.d.message_id))
                return;
            channel.fetchMessage(packet.d.message_id).then(function (message) {
                var emoji = packet.d.emoji.id ? packet.d.emoji.name + ":" + packet.d.emoji.id : packet.d.emoji.name;
                var reaction = message.reactions.get(emoji);
                var user = client.users.get(packet.d.user_id);
                if (user == null)
                    return;
                if (reaction)
                    reaction.users.set(packet.d.user_id, user);
                if (packet.t === 'MESSAGE_REACTION_ADD')
                    client.emit('messageReactionAdd', reaction, client.users.get(packet.d.user_id));
                if (packet.t === 'MESSAGE_REACTION_REMOVE')
                    client.emit('messageReactionRemove', reaction, client.users.get(packet.d.user_id));
            });
        });
    };
    return EventHandler;
}());
