import { PALETTE } from "../constants";
import {
  isProjectModalVisibleAtom,
  chosenProjectDataAtom,
  store,
} from "../store";
import { opacityTrickleDown } from "../utils";

export default function makeProjectCard(k, parent, posVec2, data, thumbnail) {
  const card = parent.add([
    k.anchor("center"),
    k.pos(posVec2),
    k.opacity(0),
    k.offscreen({ hide: true, distance: 300 }),
  ]);

  // Masque avec arrondi pour l'image
  const cardMask = card.add([
    k.rect(640, 360, { radius: 10 }),
    k.anchor("center"),
    k.mask("intersect"),
    k.opacity(0),
  ]);

  // Image du projet
  const image = cardMask.add([
    k.sprite(thumbnail, { width: 640, height: 360 }),
    k.anchor("center"),
    k.opacity(0),
  ]);

  // Titre du projet (blanc sur noir)
  const cardTitle = card.add([
    k.text(data.title, {
      font: "ibm-bold",
      size: 33,
      width: 600,
      lineSpacing: 12,
    }),
    k.color(k.Color.fromHex(PALETTE.color6)),
    k.pos(-310, 180),
    k.opacity(0),
  ]);

  // Description du projet (blanc)
  const cardDescription = card.add([
    k.text(data.description || "", {
      font: "ibm",
      size: 17,
      width: 600,
      lineSpacing: 8,
    }),
    k.color(k.Color.fromHex(PALETTE.color6)),
    k.pos(-310, 230),
    k.opacity(0),
  ]);

  // Technologies (or)
  const technologiesText = (data.technologies || []).join(" • ");
  const cardTechnologies = card.add([
    k.text(technologiesText, {
      font: "ibm",
      size: 15,
      width: 600,
      lineSpacing: 6,
    }),
    k.color(k.Color.fromHex(PALETTE.color5)),
    k.pos(-310, 280),
    k.opacity(0),
  ]);

  // Highlights (beige)
  const highlightsText = (data.highlights || [])
    .map((h) => `• ${h}`)
    .join("\n");
  const cardHighlights = card.add([
    k.text(highlightsText, {
      font: "ibm",
      size: 22,
      width: 600,
      lineSpacing: 10,
    }),
    k.color(k.Color.fromHex(PALETTE.color8)),
    k.pos(-310, 330),
    k.opacity(0),
  ]);

  // Bouton circulaire (noire)
  const cardSwitch = card.add([
    k.circle(30),
    k.area(),
    k.color(k.Color.fromHex(PALETTE.color6)),
    k.pos(400, 0),
    k.opacity(0),
  ]);

  // Interaction au clic
  cardSwitch.onCollide("player", () => {
    store.set(isProjectModalVisibleAtom, true);
    store.set(chosenProjectDataAtom, data);
  });

  // Animation d'apparition progressive
  opacityTrickleDown(parent, [
    cardMask,
    image,
    cardTitle,
    cardDescription,
    cardTechnologies,
    cardHighlights,
    cardSwitch,
  ]);

  return card;
}
