const { React } = BdApi;

module.exports = class MessageButtonPlugin {
  start() {
    const UserProfile = BdApi.findModule(m => m?.default?.displayName === "UserProfile");

    this.unpatch = BdApi.Patcher.after("MessageButtonPlugin", UserProfile, "default", (_, [props], ret) => {
      try {
        const userId = props.user.id;

        const PrivateChannelActions = BdApi.findModuleByProps("openPrivateChannel");

        const button = React.createElement("button", {
          style: {
            marginTop: "8px",
            padding: "6px 10px",
            borderRadius: "4px",
            background: "#5865F2",
            color: "white",
            border: "none",
            cursor: "pointer"
          },
          onClick: () => {
            PrivateChannelActions.openPrivateChannel(userId);
          }
        }, "Message");

        // Inject into existing buttons container
        if (ret?.props?.children) {
          ret.props.children.push(button);
        }
      } catch (err) {
        console.error("MessageButtonPlugin error:", err);
      }
    });
  }

  stop() {
    BdApi.Patcher.unpatchAll("MessageButtonPlugin");
  }
};
