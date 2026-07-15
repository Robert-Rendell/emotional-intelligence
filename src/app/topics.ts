export type Topic = {
  id: string;
  label: string;
  colorVar: string;
  description: string;
};

export const TOPICS: Topic[] = [
  {
    id: "regulation",
    label: "Emotional Regulation & Zones of Regulation",
    colorVar: "--c-regulation",
    description:
      "Frameworks and tools for recognizing which emotional zone you're in and steering back toward balance.",
  },
  {
    id: "sport-science",
    label: "Sport Science / Biology / Neurochemicals of Happiness",
    colorVar: "--c-sport",
    description:
      "How movement, physiology, and brain chemistry — dopamine, serotonin, endorphins — shape mood and wellbeing.",
  },
  {
    id: "motivation",
    label: "Self Actualisation / Motivation",
    colorVar: "--c-motivation",
    description:
      "What drives people to act, from meeting basic needs to pursuing growth, meaning, and self-actualisation.",
  },
  {
    id: "stretching",
    label: "Stretching",
    colorVar: "--c-stretch",
    description:
      "Deliberate lengthening and mobility work that releases tension and reconnects body and mind.",
  },
  {
    id: "awareness",
    label: "Awareness",
    colorVar: "--c-awareness",
    description:
      "Noticing your own emotions, triggers, and patterns of thought as they arise, not just after the fact.",
  },
  {
    id: "concentration",
    label: "Concentration",
    colorVar: "--c-concentration",
    description:
      "The capacity to direct attention deliberately and hold it there, even amid distraction.",
  },
  {
    id: "overstimulation",
    label: "Overstimulation",
    colorVar: "--c-overstim",
    description:
      "The overwhelm that follows too much sensory, emotional, or cognitive input at once.",
  },
  {
    id: "open-mind",
    label: "Open Mind / Education",
    colorVar: "--c-openmind",
    description:
      "Curiosity and a willingness to learn that keep the mind flexible, adaptable, and growing.",
  },
  {
    id: "empathy",
    label: "Empathy",
    colorVar: "--c-empathy",
    description:
      "Sensing what other people feel and letting that understanding shape how you respond to them.",
  },
  {
    id: "id-ego-superego",
    label: "Id - Ego - Superego",
    colorVar: "--c-idego",
    description:
      "Freud's model of the psyche: raw instinct, mediating reason, and internalized conscience in constant negotiation.",
  },
  {
    id: "inflated-lifestyle",
    label: "Inflated Lifestyle",
    colorVar: "--c-inflated",
    description:
      "When spending, comfort, and expectations quietly climb to match income, closing the gap between what you have and what feels like enough.",
  },
  {
    id: "morality",
    label: "Morality",
    colorVar: "--c-morality",
    description:
      "The values and principles that guide judgments of right and wrong, fair and unfair.",
  },
];
