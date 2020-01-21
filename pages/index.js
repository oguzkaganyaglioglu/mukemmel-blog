import React, { Component } from "react";
import fetch from "isomorphic-unfetch";
import Head from "next/head";
import HeadDesign from "../components/head";
import Blog from "../components/blog";
import "../style/main.scss";
import LikeSlider from "../components/slider";
import Notifications from "../components/notifications";
import FooterCopyright from "../components/footer";
import ReactResizeDetector from "react-resize-detector";
import AOS from "aos";

export class Home extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    AOS.init();
  }

  state = {
    search: ""
  };
  handleChange(e) {
    this.setState({
      search: e.target.value
    });
  }

  onResize = () => {
    AOS.refresh();
  }
  render() {
    const { posts } = this.props;

    return (
      
      <div style={{height: this.state.height}}>
      <ReactResizeDetector handleWidth handleHeight onResize={this.onResize} />
      {
        console.log( this.state.height )
      }
        <div className="container editted-container">
          <Notifications events={this.props.events} />

          <Head>
            <meta
              http-equiv="Content-Type"
              content="text/html; charset=utf-8"
            />
            <title>Home</title>
            <link
              href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
              rel="stylesheet"
              integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN"
              crossorigin="anonymous"
            ></link>
            <link
              href="https://fonts.googleapis.com/css?family=Orbitron&display=swap"
              rel="stylesheet"
            ></link>
            <link
              href="https://fonts.googleapis.com/css?family=Megrim&display=swap"
              rel="stylesheet"
            ></link>
            <link
              href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
              rel="stylesheet"
              integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
              crossorigin="anonymous"
            ></link>
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <HeadDesign
            handleChange={this.handleChange}
            search={this.state.search}
            type="main"
          />

          <LikeSlider veri={posts} />

          <div className="bettertext" style={{ padding: "80px 0px 20px 0px" }}>
            <svg width="780" height="100%" viewBox="0 0 1291.766 129.377">
              <defs>
                <linearGradient
                  id="linear-gradient"
                  y1="0.5"
                  x2="1"
                  y2="0.5"
                  gradientUnits="objectBoundingBox"
                >
                  <stop offset="0" stopColor="#ff2372" />
                  <stop offset="1" stopColor="#10003e" />
                </linearGradient>
                <linearGradient
                  id="linear-gradient-2"
                  x1="1"
                  y1="0.5"
                  x2="0"
                  y2="0.5"
                  gradientUnits="objectBoundingBox"
                >
                  <stop offset="0" stopColor="#fe4600" />
                  <stop offset="1" stopColor="#10003e" />
                </linearGradient>
              </defs>
              <path
                id="Path_6"
                data-name="Path 6"
                d="M44.945-45.878H26.869V10.1H19.534V-45.878H1.5v-6.637H44.945ZM101.836,10.1H94.5V-18.459H62.1V10.1H54.769V-52.515H62.1v27.463H94.5V-52.515h7.335Zm23.752,0h-7.335V-52.515h7.335Zm66.933,0h-8.994L151.3-39.809a20.853,20.853,0,0,1-2.008-3.93h-.262a64.458,64.458,0,0,1,.349,8.6V10.1h-7.335V-52.515h9.518L182.916-3.4Q184.88-.339,185.448.8h.175a66.244,66.244,0,0,1-.437-9.213v-44.1h7.335Zm59.991,0H242.3L218.107-18.546a17.459,17.459,0,0,1-1.659-2.183h-.175V10.1h-7.335V-52.515h7.335v29.428h.175a17.263,17.263,0,0,1,1.659-2.139l23.4-27.289h9.125L223.783-22.475Zm40.125,0H285.3V-52.515h7.335Zm53.486-55.974H328.047V10.1h-7.335V-45.878H302.68v-6.637h43.443ZM380.441,10.1V-52.515h17.814q8.121,0,12.88,3.973a12.841,12.841,0,0,1,4.759,10.348,15.226,15.226,0,0,1-2.882,9.256,15.539,15.539,0,0,1-7.946,5.589v.175a15.929,15.929,0,0,1,10.13,4.781,14.705,14.705,0,0,1,3.8,10.5,16.37,16.37,0,0,1-5.763,13.011Q407.467,10.1,398.691,10.1Zm7.335-55.974v20.215h7.51q6.025,0,9.475-2.9a10.111,10.111,0,0,0,3.449-8.187q0-9.125-12.007-9.125Zm0,26.808V3.46h9.955q6.462,0,10.02-3.056A10.469,10.469,0,0,0,411.31-7.98q0-11.09-15.107-11.09ZM464.883,10.1H431.7V-52.515h31.786v6.637H439.035v20.827h22.617v6.593H439.035V3.46h25.848Zm49.076-55.974H495.882V10.1h-7.335V-45.878H470.515v-6.637h43.443Zm48.6,0H544.478V10.1h-7.335V-45.878H519.11v-6.637h43.443ZM605.56,10.1H572.378V-52.515h31.786v6.637H579.713v20.827h22.617v6.593H579.713V3.46H605.56Zm56.935,0h-8.732L643.284-7.456a38.23,38.23,0,0,0-2.794-4.17,15.928,15.928,0,0,0-2.772-2.816,9.6,9.6,0,0,0-3.056-1.594,12.568,12.568,0,0,0-3.689-.5h-6.025V10.1h-7.335V-52.515H636.3a26.631,26.631,0,0,1,7.575,1.026,16.949,16.949,0,0,1,6.025,3.122,14.507,14.507,0,0,1,4,5.218,17.3,17.3,0,0,1,1.441,7.313,17.611,17.611,0,0,1-.982,6,15.678,15.678,0,0,1-2.794,4.868,16.938,16.938,0,0,1-4.366,3.646,22.29,22.29,0,0,1-5.742,2.336v.175a13.205,13.205,0,0,1,2.729,1.594,15.018,15.018,0,0,1,2.2,2.118,28.043,28.043,0,0,1,2.074,2.773q1.026,1.55,2.292,3.6ZM624.946-45.878v22.7H634.9a15.1,15.1,0,0,0,5.087-.83,11.776,11.776,0,0,0,4.039-2.38,10.791,10.791,0,0,0,2.663-3.8,12.718,12.718,0,0,0,.961-5.043,9.815,9.815,0,0,0-3.253-7.837q-3.253-2.816-9.409-2.816Z"
                transform="translate(-1.501 52.515)"
                fill="url(#linear-gradient)"
              />
              <path
                id="Path_5"
                data-name="Path 5"
                d="M70.718,10.1H63.427v-42q0-4.977.611-12.182h-.175a38.945,38.945,0,0,1-1.877,6.069L40.592,10.1h-3.58L15.661-37.67a37.422,37.422,0,0,1-1.877-6.418h-.175q.349,3.755.349,12.269V10.1H6.885V-52.515h9.693L35.789-8.853a55.9,55.9,0,0,1,2.882,7.51h.262Q40.81-6.5,41.945-9.028l19.6-43.487h9.169Zm64.925,0h-8.121L120.885-7.456H94.339L88.1,10.1H79.931l24.014-62.611h7.6ZM118.484-14.049,108.66-40.726a25.544,25.544,0,0,1-.961-4.192h-.175a23.387,23.387,0,0,1-1,4.192L96.784-14.049ZM188.43,10.1H178.213L154.025-18.546a17.459,17.459,0,0,1-1.659-2.183h-.175V10.1h-7.335V-52.515h7.335v29.428h.175a17.263,17.263,0,0,1,1.659-2.139l23.4-27.289h9.125L159.7-22.475Zm41.479,0H196.726V-52.515h31.786v6.637H204.061v20.827h22.617v6.593H204.061V3.46h25.848Zm43.88,0h-7.335V-52.515h7.335Zm53.486-55.974H309.2V10.1h-7.335V-45.878H283.831v-6.637h43.443ZM361.592,10.1V-52.515h17.814q8.121,0,12.88,3.973a12.841,12.841,0,0,1,4.759,10.348,15.226,15.226,0,0,1-2.882,9.256,15.539,15.539,0,0,1-7.946,5.589v.175a15.929,15.929,0,0,1,10.129,4.781,14.705,14.705,0,0,1,3.8,10.5,16.37,16.37,0,0,1-5.763,13.011Q388.619,10.1,379.843,10.1Zm7.335-55.974v20.215h7.51q6.025,0,9.475-2.9a10.111,10.111,0,0,0,3.449-8.187q0-9.125-12.007-9.125Zm0,26.808V3.46h9.955q6.462,0,10.02-3.056a10.469,10.469,0,0,0,3.558-8.383q0-11.09-15.107-11.09ZM446.034,10.1H412.851V-52.515h31.786v6.637H420.186v20.827H442.8v6.593H420.186V3.46h25.848Zm49.076-55.974H477.033V10.1H469.7V-45.878H451.666v-6.637h43.443Zm48.6,0H525.629V10.1h-7.335V-45.878H500.261v-6.637H543.7ZM586.712,10.1H553.529V-52.515h31.786v6.637H560.864v20.827h22.617v6.593H560.864V3.46h25.848Zm56.935,0h-8.732L624.435-7.456a38.23,38.23,0,0,0-2.794-4.17,15.93,15.93,0,0,0-2.773-2.816,9.6,9.6,0,0,0-3.056-1.594,12.568,12.568,0,0,0-3.689-.5H606.1V10.1h-7.335V-52.515h18.687a26.631,26.631,0,0,1,7.575,1.026,16.949,16.949,0,0,1,6.025,3.122,14.507,14.507,0,0,1,4,5.218,17.3,17.3,0,0,1,1.441,7.313,17.611,17.611,0,0,1-.982,6,15.678,15.678,0,0,1-2.794,4.868,16.938,16.938,0,0,1-4.366,3.646,22.29,22.29,0,0,1-5.742,2.336v.175a13.205,13.205,0,0,1,2.729,1.594,15.015,15.015,0,0,1,2.2,2.118,28.043,28.043,0,0,1,2.074,2.773q1.026,1.55,2.292,3.6ZM606.1-45.878v22.7h9.955a15.1,15.1,0,0,0,5.087-.83,11.776,11.776,0,0,0,4.039-2.38,10.791,10.791,0,0,0,2.663-3.8,12.717,12.717,0,0,0,.961-5.043,9.815,9.815,0,0,0-3.253-7.837q-3.253-2.816-9.409-2.816Z"
                transform="translate(648.12 119.281)"
                fill="url(#linear-gradient-2)"
              />
            </svg>
          </div>

          {
            //<h1>{this.state.search}</h1>
            //TODO: Üstteki satır düzenlenecek
          }

          <Blog
            search={this.state.search}
            veri={posts}
            search={this.state.search}
            SetpPP={4}
            Paginate="OFF"
            showMore="ON"
          />
        </div>
        <FooterCopyright />
      </div>
    );
  }
}

Home.getInitialProps = async ({ req, query }) => {
  // TODO: aşağıdaki satırda bulunan adresi kendi sunucu adresinle değiştirmelisin
  //const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'
  const res = await fetch(`${process.env.DOMAIN}/v1/blog/posts`);
  const json = await res.json();
  return {
    posts: json.posts,
    events: {
      unauthorized: query.unauthorized,
      refresh: query.refresh,
      unknown: query.unknown_error
    }
  };
};

export default Home;
