import makeKaplayCtx from "./kaplayCtx";
import { PALETTE } from "./constants";
import makePlayer from "./entities/Player";
import { cameraZoomValueAtom, store } from "./store";
import makeSection from "./components/Section";
import makeSocialIcon from "./components/SocialIcon";
import { makeAppear } from "./utils";
import makeEmailIcon from "./components/EmailIcon";
import makeSkillIcon from "./components/SkillIcon";
import makeWorkExperienceCard from "./components/WorkExperienceCard";
import makeProjectCard from "./components/ProjectCard";
export default async function initGame() {
  const generalData = await (await fetch("./configs/generalData.json")).json();
  const socialsData = await (await fetch("./configs/socialsData.json")).json();
  const skillsData = await (await fetch("./configs/skillsData.json")).json();
  const experiencesData = await (await fetch("./configs/experiencesData.json")).json();
  const projectsData = await (await fetch("./configs/projectsData.json")).json();
  const k = makeKaplayCtx();

k.loadSprite("player", "./sprites/player.png", {
  sliceX: 12,
  sliceY: 4,
  anims: {
    // Rangée 0: Marche vers le bas
    "walk-down-idle": 0,
    "walk-down": { from: 0, to: 11, loop: true, speed: 10 },
    
    // Rangée 1: Marche vers la gauche
    "walk-left-idle": 12,
    "walk-left": { from: 12, to: 23, loop: true, speed: 10 },
    
    // Rangée 2: Marche vers la droite
    "walk-right-idle": 24,
    "walk-right": { from: 24, to: 35, loop: true, speed: 10 },
    
    // Rangée 3: Marche vers le haut
    "walk-up-idle": 36,
    "walk-up": { from: 36, to: 47, loop: true, speed: 10 },
  },
});
  k.loadFont("ibm-regular", "./fonts/IBMPlexSans-Regular.ttf");
  k.loadFont("ibm-bold", "./fonts/IBMPlexSans-Bold.ttf");
  k.loadSprite("github-logo", "./logos/github-logo.png");
  k.loadSprite("portfolio-logo", "./logos/portfolio-logo.jpg");
  k.loadSprite("linkedin-logo", "./logos/linkedin-logo.png");
  k.loadSprite("youtube-logo", "./logos/youtube-logo.png");
  k.loadSprite("C-logo", "./logos/C-logo.png");
  k.loadSprite("cpp-logo", "./logos/cpp-logo.png");
  k.loadSprite("excel-logo", "./logos/Microsoft Excel-logo.png");
  k.loadSprite("MATLAB-logo", "./logos/matlab-logo.png");
  k.loadSprite("Java-logo", "./logos/java-logo.png");
  k.loadSprite("R-logo", "./logos/R-logo.png");
  k.loadSprite("javascript-logo", "./logos/js-logo.png");
  k.loadSprite("typescript-logo", "./logos/ts-logo.png");
  k.loadSprite("powerbi-logo", "./logos/Power BI-logo.png");
  k.loadSprite("azure-logo", "./logos/Azure-logo.png");
  k.loadSprite("docker-logo", "./logos/docker-logo.png");
  k.loadSprite("github-actions-logo", "./logos/git-action-logo.png");
  k.loadSprite("Flask-logo", "./logos/flask-logo.png");
  k.loadSprite("FastAPI-logo", "./logos/fast-logo.png");
  k.loadSprite("sqlite-logo", "./logos/SQLlite-logo.png");
  k.loadSprite("tensorflow-logo", "./logos/TensorFlow-logo.png");
  k.loadSprite("pytorch-logo", "./logos/pytorch-logo.png");
  k.loadSprite("scikit-learn-logo", "./logos/scikit-learn-logo.png");
  k.loadSprite("streamlit-logo", "./logos/Streamlit-logo.png");
  k.loadSprite("keras-logo", "./logos/Keras-logo.png");
  k.loadSprite("mysql-logo", "./logos/mysql-logo.png");
  k.loadSprite("react-logo", "./logos/react-logo.png");
  k.loadSprite("nodejs-logo", "./logos/Node.js-logo.png");
  k.loadSprite("postgres-logo", "./logos/postgres-logo.png");
  k.loadSprite("html-logo", "./logos/html-logo.png");
  k.loadSprite("css-logo", "./logos/css-logo.png");
  k.loadSprite("tailwind-logo", "./logos/tailwind-logo.png");
  k.loadSprite("python-logo", "./logos/python-logo.png");
  k.loadSprite("email-logo", "./logos/email-logo.png");
  k.loadSprite("credit", "./projects/credit.jpg");
  k.loadSprite("customer-churn", "./projects/customer.jpg");
  k.loadSprite("nlp-sql", "./projects/nlp.png");
  k.loadSprite("codiv-xray-classification", "./projects/covid.jpg");
  


  // shaders
  k.loadShaderURL("tiledPattern", null, "./shaders/tiledPattern.frag");
const setInitCamZoomValue = () => {
    if(k.width() >= 1000) {
        k.setCamScale(0.5);
        store.set(cameraZoomValueAtom, 0.5);
        return
    }else{
    k.setCamScale(k.vec2(0.8));
    store.set(cameraZoomValueAtom, 0.8);
  }
}
setInitCamZoomValue();

    k.onUpdate(() => {
      const cameraZoomValue = store.get(cameraZoomValueAtom);
      if (cameraZoomValue !== k.getCamScale().x) k.setCamScale(cameraZoomValue);
    });

  const tiledBackground = k.add([
    k.uvquad(k.width(), k.height()),
    k.shader("tiledPattern", () => ({
      u_time: k.time() / 20,
      u_color1: k.Color.fromHex(PALETTE.color3), // peau
      u_color2: k.Color.fromHex(PALETTE.color2), // salopette
      u_speed: k.vec2(1, -1),
      u_aspect: k.width() / k.height(),
      u_size: 5,
    })),
    k.pos(0),
    k.fixed(),
  ]);
  
  k.onResize(() => {
    tiledBackground.width = k.width();
    tiledBackground.height = k.height();
    tiledBackground.uniform.u_aspect = k.width() / k.height();
  });

   makeSection(
    k,
    k.vec2(k.center().x, k.center().y - 400),
    generalData.section1Name,
    (parent) => {
    
      const container = parent.add([k.pos(-805,-700),k.opacity(0)]);

      container.add([
        k.text(generalData.header.title, { font: "ibm-bold", size: 88}),
        k.color(k.Color.fromHex(PALETTE.color6)),
        k.pos(373,0),
        k.opacity(0),
      ]); 

      container.add([
        k.text(generalData.header.subtitle, {
          font: "ibm-bold",
          size: 48,
        }),
        k.color(k.Color.fromHex(PALETTE.color6)),
        k.pos(300, 100),
        k.opacity(0),
      ]);

const socialContainer = container.add([k.pos(130, 0), k.opacity(0)]);
for (const socialData of socialsData) {
  if (socialData.name === "Email") {
    makeEmailIcon(
      k,
      socialContainer,
      k.vec2(socialData.pos.x, socialData.pos.y),
      socialData.logoData,
      socialData.name,
      socialData.address
    );
    continue;
  }

  makeSocialIcon(
    k,
    socialContainer,
    k.vec2(socialData.pos.x, socialData.pos.y),
    socialData.logoData,
    socialData.name,
    socialData.link,
    socialData.description
  );
}
      makeAppear(k, container);
      makeAppear(k, socialContainer);
    }
    );
      
  makeSection(
    k,
    k.vec2(k.center().x - 650, k.center().y),
    generalData.section2Name,
    (parent) => {
      const container = k.add([
        k.opacity(0),
        k.pos(parent.pos.x - 300, parent.pos.y),
      ]);

      for (const skillData of skillsData) {
        makeSkillIcon(
          k,
          container,
          k.vec2(skillData.pos.x, skillData.pos.y),
          skillData.logoData,
          skillData.name
        );
      }

      makeAppear(k, container);
    }
  );

  makeSection(
    k,
    k.vec2(k.center().x + 650, k.center().y),
    generalData.section3Name,
    (parent) => {
      const container = parent.add([k.opacity(0), k.pos(0)]);
      for (const experienceData of experiencesData) {
        makeWorkExperienceCard(
          k,
          container,
          k.vec2(experienceData.pos.x, experienceData.pos.y),
          experienceData.cardHeight,
          experienceData.roleData
        );
      }

      makeAppear(k, container);
    }
  );
   
  makeSection(
    k,
    k.vec2(k.center().x, k.center().y + 400),
    generalData.section4Name,
    (parent) => {
      const container = parent.add([k.opacity(0), k.pos(0, 0)]);

      for (const project of projectsData) {
        makeProjectCard(
          k,
          container,
          k.vec2(project.pos.x, project.pos.y),
          project.data,
          project.thumbnail
        );
      }

      makeAppear(k, container);
    }
  );

  makePlayer(k, k.vec2(k.center()), 700);
}