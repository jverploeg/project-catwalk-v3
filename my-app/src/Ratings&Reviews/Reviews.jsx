/* eslint-disable */
import React from 'react';
import axios from 'axios';
import StarRatingComponent from 'react-star-rating-component';
import Recommend from './Recommend.jsx';
import Moment from 'react-moment';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Response from './Response.jsx';

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {helpful: this.props.review.helpfulness};
    this.markHelp = this.markHelp.bind(this);
    this.addHelpful = this.addHelpful.bind(this);
  }

  markHelp(id) {
    axios.put(`/reviews/:${review_id}/helpful`, {
      // params: {
      //   product_id: this.state.product_id,
      //   //product_id: 1,
      // },
    })
    .then(response => {
      console.log({response})
      let results = response.data;
      console.log({results});
      this.setState({ reviews: results });
    })
    .catch(response => {
      console.log(response);
    })
  };


  addHelpful() {
      this.setState({helpful: this.state.helpful + 1})
    console.log(this.props.review)
    let review_id = this.props.review.review_id;
    //markHelp(review_id);
    axios.put(`/reviews/helpful`, {
      params: {
        review_id: review_id,
        //product_id: 1,
      },
    })
    .then(response => {
      console.log({response})
      let results = response.data;
      console.log({results});
      this.setState({ reviews: results });
    })
    .catch(response => {
      console.log(response);
    })

  };


  render() {
    const resultsLoaded = this.props.review;
    let display;
    if (resultsLoaded) {
      display = (
        <div className="review">
          <div className="review-top">
            <StarRatingComponent name="star1" starCount={5} value={this.props.review.rating} className="review-rating"/>
            <div>
              <span className="review-user">{this.props.review.reviewer_name}, </span>
              <Moment format='MMMM D, YYYY' className="review-date" date={this.props.review.date} />
            </div>
          </div>
          <div className="review-summ">{this.props.review.summary}</div>
          <div className="review-body">{this.props.review.body}</div>
          <Recommend recommend={this.props.review.recommend} className="review-recommend" />
          <Response response={this.props.review.response}/>
          <div className="helpful">
            Helpful?
            <Button variant="link" onClick={this.addHelpful}>Yes</Button>
            ({this.state.helpful}) |
            <Button variant="link">Report</Button>
            </div>
        </div>
      );
    } else {
      display = <div>loading...</div>;
    }
    return (
      <div>
        {display}
      </div>
    );
  }
}
export default Reviews;



