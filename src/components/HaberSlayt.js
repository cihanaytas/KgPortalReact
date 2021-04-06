import React, { useState } from 'react';
import UserService from "../services/user_service";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';
import { connect } from 'react-redux';
import moment from 'moment'
import 'moment/locale/tr'



const HaberSlayt = (props) => {
    
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === props.haberler.length - 1 ? 0 : activeIndex + 1;
 
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? props.haberler.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }

 

 


  const slides = props.haberler.map((item) => {

  

    return (
      <CarouselItem
        className="custom-tag"
        tag="div"
        key={item.id}
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        
      >
        <CarouselCaption className="text" captionText={
              moment().locale('tr'),moment(item.date).format('LL')}
               captionHeader={item.haber} />
                <img src="https://tinyurl.com/4dp8vnth" />
      </CarouselItem>
    );
  });

  return (
    <div>
      <style>
        {
          `.custom-tag {
              max-width: 100%;
              height: 500px;
              background: black;
            }`
        }
      </style>
      <Carousel
        activeIndex={activeIndex}
        next={next}
        previous={previous}
      >
        <CarouselIndicators items={props.haberler} activeIndex={activeIndex} onClickHandler={goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
      </Carousel>
    </div>
  );
}








function mapStateToProps(state) {
    return {
      haberler: state.getHaberler
    };
  }
  

export default connect(mapStateToProps)(HaberSlayt);