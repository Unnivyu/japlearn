import bgImage1 from '../assets/level_ui/sample.jpg';

const levelData = {
    "level1": [
      {
        "backgroundImage": "https://cdna.artstation.com/p/assets/images/images/024/507/728/large/saito-ryou-1.jpg?1582651639",
        "scenes": [
          {
            "texts": [
              {
                "text": "It seems someone is approaching. They seem to have a problem.",
                "speaker": "Narrator",
                "characterImage": "",
                "position": "left"
              },
              {
                "text": "You notice they look worried.",
                "speaker": "Narrator",
                "characterImage": bgImage1,
                "position": "center"
              },
              {
                "text": "He seems hesitant to ask for help. How do you react?",
                "speaker": "Narrator",
                "characterImage": "https://example.com/character1.jpg",
                "position": "right"
              }
            ],
            "choices": [
              { "text": "Offer help", "nextSceneId": 2 },
              { "text": "Ignore and continue", "nextSceneId": 3 }
            ]
          },
          {
            "backgroundImage": "https://example.com/background2.jpg",
            "texts": [
              {
                "text": "You offered your help and the stranger seems relieved.",
                "speaker": "Narrator",
                "characterImage": "https://example.com/character2.jpg",
                "position": "left"
              },
              {
                "text": "He thanks you and starts telling his story.",
                "speaker": "Stranger",
                "characterImage": "https://example.com/character2.jpg",
                "position": "right"
              }
            ],
            "choices": [
              { "text": "Continue listening", "nextSceneId": 3 },
              { "text": "Excuse yourself", "nextSceneId": 4 }
            ]
          }
        ]
      }
    ]
  };
  export default levelData;
  