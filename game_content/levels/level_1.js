const storyData = {
  scenes: [
    {
      id: "scene1",
      background: require("../../assets/level_ui/background1.png"),
      dialogues: [
        { character: "Alice", text: "Welcome to the forest!", characterImage: require("../../assets/sprites/sprite.png"), position: "right" },
        { character: "Player", text: "Save me white woman, save me white woman, save me please, oh please", characterImage: require("../../assets/sprites/sprite.png"), position: "right", }
      ],
      options: [
        { text: "It's joever", goTo: "scene2" },
        { text: "It's much easier to imagine the end of the world rather than the end of cap...", goTo: "scene3" },
        { text: "We are so fucked", goTo: "scene4" },
        { text: "Why me???? fr", goTo: "scene2" },
      ]
    },
    {
      id: "scene2",
      dialogues: [
        { text: "Welcome to the forest!" },
      ],
    },
    // Additional scenes...
  ]
};
export default storyData;
