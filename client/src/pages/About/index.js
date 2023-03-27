import React from "react";
import { Link } from 'react-router-dom';

function About() {
    return (
        <div>
            <h1>About Page</h1>
            [<Link to={"/"} > Home </Link> | <Link to={"/login"} > Login </Link> | <Link to={"/signup"} > Signup </Link> | About ]

            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc aliquet diam tortor, id
                consequat mauris ullamcorper eu. Orci varius natoque penatibus et magnis dis
                parturient montes, nascetur ridiculus mus. Pellentesque et dui id justo finibus
                sollicitudin at et metus. Ut feugiat tellus nec metus commodo, sed suscipit nisi
                gravida. Duis eget vestibulum quam, ut porttitor sem. Donec sagittis mi sollicitudin
                turpis semper, et interdum risus lobortis. Vestibulum suscipit nunc non egestas
                tristique. Proin hendrerit efficitur malesuada. Mauris lorem urna, sodales accumsan
                quam non, tristique tempor erat. Nullam non sem facilisis, tempus tortor sit amet,
                volutpat nisl. Ut et turpis non nunc maximus mollis a vitae tortor. Pellentesque
                mattis risus ac quam laoreet cursus. Praesent suscipit orci neque, vestibulum
                tincidunt augue tincidunt non. Duis consequat mattis tortor vitae mattis.
            </p>
        </div>
    );
}

export default About;
