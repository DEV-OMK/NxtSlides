import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import Navbar from '../Navbar'
import SlideTab from '../SlideTab'
import './index.css'

const initialSlidesList = [
  {
    id: 'cc6e1752-a063-11ec-b909-0242ac120002',
    heading: 'Welcome',
    description: 'Rahul',
  },
  {
    id: 'cc6e1aae-a063-11ec-b909-0242ac120002',
    heading: 'Agenda',
    description: 'Technologies in focus',
  },
  {
    id: 'cc6e1e78-a063-11ec-b909-0242ac120002',
    heading: 'Cyber Security',
    description: 'Ethical Hacking',
  },
  {
    id: 'cc6e1fc2-a063-11ec-b909-0242ac120002',
    heading: 'IoT',
    description: 'Wireless Technologies',
  },
  {
    id: 'cc6e20f8-a063-11ec-b909-0242ac120002',
    heading: 'AI-ML',
    description: 'Cutting-Edge Technology',
  },
  {
    id: 'cc6e2224-a063-11ec-b909-0242ac120002',
    heading: 'Blockchain',
    description: 'Emerging Technology',
  },
  {
    id: 'cc6e233c-a063-11ec-b909-0242ac120002',
    heading: 'XR Technologies',
    description: 'AR/VR Technologies',
  },
]

class NxtSlide extends Component {
  state = {
    activeSlideId: initialSlidesList[0].id,
    slidesList: initialSlidesList,
    editHeading: false,
    editDescription: false,
  }

  addNewSlide = () => {
    const {activeSlideId, slidesList} = this.state
    const index = slidesList.findIndex(
      eachSlide => eachSlide.id === activeSlideId,
    )
    const newSlide = {
      id: uuidv4(),
      heading: 'Heading',
      description: 'Description',
    }

    const newSlidesList = [
      ...slidesList.slice(0, index + 1),
      newSlide,
      ...slidesList.slice(index + 1),
    ]

    this.setState({
      activeSlideId: newSlide.id,
      slidesList: newSlidesList,
    })
  }

  updateActiveSlide = id => {
    this.setState({
      activeSlideId: id,
    })
  }

  renderSlidesList = () => {
    const {slidesList, activeSlideId} = this.state
    let number = 0

    return (
      <ol className="slides-list-container">
        {slidesList.map(eachSlide => {
          number += 1
          return (
            <SlideTab
              key={eachSlide.id}
              slideNumber={number}
              slideDetails={eachSlide}
              isActiveSlide={activeSlideId === eachSlide.id}
              updateActiveSlide={this.updateActiveSlide}
            />
          )
        })}
      </ol>
    )
  }

  renderCurrentSlide = () => {
    const {editHeading, editDescription, activeSlideId, slidesList} = this.state
    const currentSlide = slidesList.find(
      eachSlide => eachSlide.id === activeSlideId,
    )
    const {id, heading, description} = currentSlide

    const onChangeHeading = event => {
      const newSlidesList = slidesList.map(eachSlide => {
        if (eachSlide.id === id) {
          return {...eachSlide, heading: event.target.value}
        }
        return eachSlide
      })

      this.setState({slidesList: newSlidesList})
    }

    const onChangeDescription = event => {
      const newSlidesList = slidesList.map(eachSlide => {
        if (eachSlide.id === id) {
          return {...eachSlide, description: event.target.value}
        }
        return eachSlide
      })

      this.setState({slidesList: newSlidesList})
    }

    const editModeHeading = () => {
      this.setState(prevState => ({editHeading: !prevState.editHeading}))
    }

    const editModeDescription = () => {
      this.setState(prevState => ({
        editDescription: !prevState.editDescription,
      }))
    }

    return (
      <div className="current-slide">
        {editHeading ? (
          <input
            type="text"
            value={heading}
            id={`heading${id}`}
            className="current-slide-heading edit"
            onChange={onChangeHeading}
            onBlur={editModeHeading}
          />
        ) : (
          <h1 className="current-slide-heading" onClick={editModeHeading}>
            {heading}
          </h1>
        )}
        {editDescription ? (
          <input
            type="text"
            value={description}
            id={`heading${id}`}
            className="current-slide-description edit"
            onChange={onChangeDescription}
            onBlur={editModeDescription}
          />
        ) : (
          <p
            className="current-slide-description"
            onClick={editModeDescription}
          >
            {description}
          </p>
        )}
      </div>
    )
  }

  render() {
    return (
      <div className="main-container">
        <div className="responsive-container">
          <Navbar />
          <button
            type="button"
            className="new-slide-button"
            onClick={this.addNewSlide}
          >
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-slides/nxt-slides-plus-icon.png"
              alt="new plus icon"
              className="plus-icon"
            />
            New
          </button>
          <div className="slides-container">
            {this.renderSlidesList()}
            {this.renderCurrentSlide()}
          </div>
        </div>
      </div>
    )
  }
}

export default NxtSlide
