import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faGithubAlt,
  faGoogle,
  faFacebook,
  faTwitter
} from '@fortawesome/free-brands-svg-icons';

library.add(
faGoogle
);
function Google() {
  return (
    <div>
      <div className="google-btn cursor-pointer">
        <div className="google-icon-wrapper flex justify-center items-center gap-3">
        <FontAwesomeIcon icon={faGoogle}/>
        <p className="btn-text select-none">
          <b>Sign Up with google</b>
        </p>
        </div>
      </div>
    </div>
  );
}

export default Google;
