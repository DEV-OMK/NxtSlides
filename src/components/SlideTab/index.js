import './index.css'

const SlideTab = props => {
  const {slideNumber, slideDetails, isActiveSlide, updateActiveSlide} = props
  const {id, heading, description} = slideDetails
  const activeSlideClassName = isActiveSlide
    ? 'active-slide slide-item'
    : 'slide-item'

  const onClickSlide = () => {
    updateActiveSlide(id)
  }

  return (
    <li
      className={activeSlideClassName}
      onClick={onClickSlide}
      testid={`slideTab${slideNumber}`}
    >
      <p className="slide-number">{slideNumber}</p>
      <button type="button" className="slide">
        <h1 className="slide-heading">{heading}</h1>
        <p className="slide-description">{description}</p>
      </button>
    </li>
  )
}

export default SlideTab
