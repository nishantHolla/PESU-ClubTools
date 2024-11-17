import React from "react";
import "./templates_style.css";
import ImageFrame from "../../components/ImageFrame/ImageFrame";

function Templates() {
  const canvaTemplates = [
    {
      id: 1,
      src: "https://marketplace.canva.com/EAF7h2vFXaU/1/0/1600w/canva-tXXLH2AOZpY.jpg",
      link: "https://www.canva.com/design?create&type=TACTmE1fsnQ&template=EAF7h2vFXaU&category=tAFBBL5OE1A&analyticsCorrelationId=beb0057b-4ca5-415f-a832-50e94357d654",
      title:
        "Blue and Gold Elegant Curved Certificate Of Achievement Certificate",
    },
    {
      id: 2,
      src: "https://marketplace.canva.com/EAFyDmI-DqY/3/0/1600w/canva-M9XcqPS3fg8.jpg",
      link: "https://www.canva.com/design?create&type=TACTmE1fsnQ&template=EAFyDmI-DqY&category=tAFBBL5OE1A&analyticsCorrelationId=762a58f0-c0f5-49f9-99f4-19012c1067ec",
      title: "Colorful Modern Geometric Certificate of Participation",
    },
    {
      id: 3,
      src: "https://marketplace.canva.com/EAFNlUJs5g4/2/0/1600w/canva-Fcz7KkZ5YaU.jpg",
      link: "https://www.canva.com/design?create&type=TACTmE1fsnQ&template=EAFNlUJs5g4&category=tAFBBL5OE1A&analyticsCorrelationId=41e0076a-6dac-4692-807d-40b44fd1847a",
      title: "White Simple Certificate of Appreciation",
    },
    {
      id: 4,
      src: "https://marketplace.canva.com/EAFxwjeONxc/3/0/1600w/canva-o0roxDs8EME.jpg",
      link: "https://www.canva.com/design?create&type=TACTmE1fsnQ&template=EAFxwjeONxc&category=tAFBBL5OE1A&analyticsCorrelationId=40cf5348-83e3-4498-89d5-ea2d42361fae",
      title: "Gold Elegant Appreciation Certificate",
    },
    {
      id: 5,
      src: "https://marketplace.canva.com/EAF5ZVffmZw/1/0/1600w/canva-yMEujoaa8Hs.jpg",
      link: "https://www.canva.com/design?create&type=TACTmE1fsnQ&template=EAF5ZVffmZw&category=tAFBBL5OE1A&analyticsCorrelationId=c59915ab-950a-47c9-ab72-6d6b2e9dd24f",
      title: "Modern Vintage Certificate of Achievement",
    },
    {
      id: 6,
      src: "https://marketplace.canva.com/EAFpQhrFglU/4/0/1600w/canva-8nHc0EVtVDE.jpg",
      link: "https://www.canva.com/design?create&type=TACTmE1fsnQ&template=EAFpQhrFglU&category=tAFBBL5OE1A&analyticsCorrelationId=428d0127-105d-4df6-8b74-37d7e36a4138",
      title: "Gray Black Modern Certificate",
    },
  ];

  return (
    <div className="dashboard-container">
      {canvaTemplates.map((template) => (
        <ImageFrame
          key={template.id}
          src={template.src}
          alt={template.title}
          link={template.link}
          className="template-frame"
        >
          {template.title}
        </ImageFrame>
      ))}
    </div>
  );
}

export default Templates;
