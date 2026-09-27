// export default function Hero({ profile, onOpenChat }) {
//   return (
//     // <section className="hero" id="top">
//     //   <div className="hero__eyebrow mono">whoami</div>
//     //   <h1>{profile.tagline}</h1>
//     //   <p className="lede">{profile.summary}</p>
//     //   <div className="hero__actions">
//     //     <button type="button" className="btn btn--primary" onClick={onOpenChat}>
//     //       Ask my AI assistant about me
//     //     </button>
//     //     <a className="btn" href={profile.links.resume}>
//     //       View resume
//     //     </a>
//     //     <a className="btn" href={`mailto:${profile.email}`}>
//     //       Email me
//     //     </a>
//     //   </div>
//     // </section>
// <section className="hero">
//   <div className="hero__content">
//     <div className="hero__eyebrow">whoami</div>

//     <h1>{profile.tagline}</h1>

//     <p className="lede">
//       {profile.summary}
//     </p>

//     <div className="hero__actions">
//       <button
//         type="button"
//         className="btn btn--primary"
//         onClick={onOpenChat}
//       >
//         Ask my AI assistant about me
//       </button>

//       <a href={profile.links.resume} className="btn">
//         View resume
//       </a>

//       <a href={`mailto:${profile.email}`} className="btn">
//         Email me
//       </a>
//     </div>
//   </div>

//   <div className="hero__photo">
//     <div className="hero__photo-frame">
//       <img
//         src="/profile.jpg"
//         alt="Prakash Singh"
//       />
//     </div>
// {/* path of img: client/public/profile.jpg */}
//     <div className="hero__photo-label">
//       <span>Software Engineer</span>
//       <span>·</span>
//       <span>.NET / AI / Full Stack</span>
//     </div>
//   </div>
// </section>


//   );
// }




export default function Hero({ profile, onOpenChat }) {
  return (
    <section className="hero" id="top">
      <div className="hero__content">
        <div className="hero__eyebrow mono">whoami</div>

        <h1>{profile.tagline}</h1>

        <p className="lede">
          {profile.summary}
        </p>

        <div className="hero__actions">
          <button
            type="button"
            className="btn btn--primary"
            onClick={onOpenChat}
          >
            Ask my AI assistant about me
          </button>

          <a href={profile.links.resume} className="btn">
            View resume
          </a>

          <a href={`mailto:${profile.email}`} className="btn">
            Email me
          </a>
        </div>
      </div>

      <div className="hero__photo">
        <div className="hero__photo-frame">
          <img
            src="/profile.png"
            alt="Prakash Singh"
          />
        </div>

        <div className="hero__photo-label">
          <span>Software Engineer</span>
          <span>·</span>
          <span>.NET / AI / Full Stack</span>
        </div>
      </div>
    </section>
  );
}
