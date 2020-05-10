
# DiscordAPI with GUI System

DiscordAPI System allowing GUI Creation

**Simple GUI Video (click on the image below)**

[![Simple GUI Demo](https://i.imgur.com/tciFrnh.png)](https://youtu.be/3-WWoTjsgwY)

**GUI with async calls between GUIs Video (click on the image below)**

[![Using Async Call](https://i.imgur.com/d6NHcpI.png)](https://youtu.be/fnshn4kfrh8)

**Simple message refreshed every seconds**

<img src="https://i.imgur.com/wfSsbGF.png" height="600" width="430">

## Installation

`npm install @jordanbonaldi/DiscordAPI`

```typescript
 setCredentials(serverId: string, loginToken: string): DiscordAPI;
 login(): Promise<Client>;

 //e.g
 DiscordAPI.setCredentials('xxx', 'xxx').login().then((client: Client) => ...);
```

## How to use it

   ```typescript
  export default class DisplayGUI extends GUI {  
 
	  constructor() {  
		  super(  
			  '#ffa701', // Hexa Color 
			  'Here is a title', // GUI Title
			  'Neferett', // Author Name 
			  `Here is a description`, // Discription (below title)  
			  `Here is a footer`, // Footer at the left of 'updated at'  
			  '<url>', // URL Thumbnail can be empty but not null  
			  '2629162438228282',  
			  true, // Channel contains only 1 message (the GUI) 
			  true, // Should the GUI be loaded inside the GUIHandler
			  false, // Is the GUI a DM | Optional, always false,
			  '<url>' // Image below fields | Optional, always empty
		  );  
	  }  
	  
	  protected defineButtons(): void {
	     //Use of abstract method addButton to add infinite buttons
	     //Containing Icon and GUI String Name
		  this.addButton(Button('💎', 'NextGUIName'));  
	  } 
	   
	  protected defineField(): void {  
	  	  //Use of abstract method addFields to add infinite fields
	     //Containing Field Name, Field Description, inline, blank
	     //Inline will post the next field in the same line (maximum 3)
	     //Blank will create a space of 10 pixels between each fields
		  this.addFields(Field(`Field Name`, `Field Description`, true, false));  
	  }  
	  
	  protected refreshData(): Promise<any> {
	     //If your GUI has Async data to compute, it will always run this method
		  return Promise.resolve();  
	  }

	 /**  
	  * @param user  
	  * @param message  
	  */
	  public onMessage(user: User, message: Message): Promise<Message> {
	     // If you want to handle users messages inside the GUI
	     // Super call will remove the message by default
		  return super.onMessage(user, message); 
	  };
}
```

Once your GUI is created you have to add it inside the GUIHandler:

```typescript
 GUIHandler.connectGUI(new DisplayGUI()): void;
```

Once all your GUIs connected you have to load the system:
```typescript
 GUIHandler.loadAll(): Promise<void[]>
```

If you want to manually handle GUI Creation and Opening using messages:

```typescript
 GUIHandler.changeGUI(newGui: GUI, oldGui: GUI): Promise<MessageReaction[]>
 //e.g
 GUIHandler.changeGUI(this, new NextGUI());
```

For DMs:

```typescript
 GUIHandler.changeGUIDms(newGui: GUI, oldGui: GUI, user: User): Promise<Message>
 //e.g
 GUIHandler.changeGUIDms(this, new NextGUI(), user);
```

## Command System

Creating a commands using Command abstract
```typescript
export default new class HelpCommand extends Command {  
  
  constructor() {  
	  super('help', '/* roleID that can execute command to the bot */', '/help');  
  }  
  
  /*  
   *
   * @param executor  
   * @param args  
   */  
  onCommand(executor: User, args: string[] = []): Promise<string> {  
	  let message = "Here are the available commands:\n";  
	  
	  engines.commands.forEach((e: Command) => {  
		  message += `Commands: ${e.name} |  RoleId: [${e.roleId}]  |  Usage: ${e.help}\n`;  
	  });  
	  
	  return Promise.resolve(message);  
  }  
}
```

Initiate the command from definedEngines.d.ts :
```typescript
 engines.commands.push(HelpCommand)
```

## Event System

Creating event using Event abstract:
```typescript
export default new class ReactionsEvent extends Event {  
  
  constructor() {  
	  super('messageReactionAdd'); // Use string discord event name 
  }  
  /* 
   * 
   * @param reaction 
   * @param user 
   */  
  onEvent(reaction: MessageReaction): null | Promise<any> {  
	  if (reaction.users.filter(e => !e.bot).size === 0)  
	  return null;  
	  
	  let user: User = reaction.users.last();  
	  return reaction.remove(user);  
  }); 
}
```

Listening the event:
```typescript
engines.events.push(ReactionsEvent);
```

## Discord shortcuts and usefull methods

```typescript
 getGuild(): Guild | undefined

 getMember(userId: string): GuildMember | null

 memberSetRole(userId: string, roleId: string): Promise<GuildMember | undefined>

 memberRemoveRole(userId: string, roleId: string): Promise<GuildMember | undefined>

 memberHasRole(userId: string, roleId: string): boolean

 sendMessage(userId: string, message: string): Promise<Message | Message[]> | null

 getChannelFromId(channelId: string): TextChannel | undefined

 sendMessageOnChannel(channelId: string, message: Message | RichEmbed | string): Promise<Message | Message[]>

 sendFileOnChannel(channelId: string, message: string, file: string): Promise<Message | Message[]> | null

 changeChannelName(channelId: string, title: string): Promise<GuildChannel>

 createEmbed(): RichEmbed

 removeMessage(channelId: string, messageId: string): Promise<Message> | null

 flushChannel(channelId: string): Promise<Message[] | undefined>

 actionOnFetchedMessage(  
  channelId: string,  
  messageId: string,  
  callback: (message: Message) => Promise<Message | MessageReaction | void>  
 ): Promise<Message | any>

 modifyMessage(channelId: string, messageId: string, newMessage: string | RichEmbed | Message): Promise<Message> | null

 awaitAndChange(  
  channelId: string,  
  messageId: string,  
  emoji: string,  
  newMessage: string | Message | RichEmbed,  
  ...reactions: any  
 ): Promise<any>

 addReactions(channelId: string, messageId: string, emoji: string): Promise<any> | null

 // GUIHandler methods
 GUIHandler.getGUIWithReaction(reaction: string, channelId: string, userID ?: string): GUI | null
 GUIHandler.getGUIOfUser(userID: string): GUI
 GUIHandler.removeGui(gui: GUI)

```

## License

Licensed under MIT
