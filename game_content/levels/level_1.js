const storyData = {
  scenes: [
    {
      id: "scene1",
      background: require("../../assets/level_ui/sample.jpg"),
      dialogues: [
        { character: "Alice", text: "Welcome to the forest!", image: require("../../assets/sprites/sprite.png") },
        { character: "Player", text: "I am in shambles...", image: "" }
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
        {text: "Welcome to the forest!"},
      ],
      
    }
    // Additional scenes...
  ]
};
export default storyData;