import React from 'react';
import Slider from './Slider';
import TextContent from './TextContent';
import PopularItems from './PopularItems';

class Home extends React.Component<{}, {}> {
  render() {
    return (
      <div className="root">
        <style jsx>{`
          .root {
            width: 100%;
          }
        `}</style>
        <Slider />
        <div className="app-container">
          <TextContent />
          <div className="app-section">
            <PopularItems />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
