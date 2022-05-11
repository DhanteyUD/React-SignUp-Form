export const passLink = (name: string, link: string) => {
    const registrationHTML = `
  <div style="background-color:white; padding-bottom:2rem; ">
    <div class="container" style ="margin: auto; color: black; margin: auto; background-color:white; width: 80%; height: 80%; border-radius: 0.4rem;
    box-shadow: 1px 2px whitesmoke; margin-top:1rem;border: 2px solid rgb(237, 230, 230) " >
    <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
  />
      <link href='http://fonts.googleapis.com/css?family=Lato' rel='stylesheet' type='text/css'>
  <head> <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"> </head>
  <h1 class="header-text" style = "font-family: 'Lato', cursive; text-align: center;padding-top:2rem; ">You're in good crypto company</h1>
  <div class="btnContainer" style=" padding:1rem;text-align: center;border-radius: 25px;" ><img style= "margin: auto; width:80%;
  height: 90%; display:block;border-radius: 25px; ";
      class="imgClass"
      src=https://res.cloudinary.com/brosj/image/upload/v1652113202/LightPay_zcdcdd.jpg
    /></div>
  <h2 style = " margin: auto; padding:2rem;text-align: center; font-family: 'Lato', cursive;"  >Hi ${name}, <br>Activate your account to start your crypto
    journey on LightPay.</h2>
  <div class="btnContainer" style="padding:0 100px; "><a href='${link}'><button class="btn" style=" background-color: #4CAF50; cursor: pointer; border: none; margin-top:
  6rem; color: white; padding: 15px 32px; text-align: center;
  text-decoration: none; display:block; font-size: 16px; margin:
  auto; width: 50%;" >Activate your account</button></a>
  </div>
  <h3  style="font-family: 'Lato', cursive; padding:2rem;text-align: center;">Once active, your account is the gateway to our
    universe of crypto assets and services that help you build your
    financial freedom.Link not working? Access lightPay and enter the
    activation code:</h3>
  <hr class="horizonal-line" />
  <p style="padding:2rem; font-family: 'Lato', cursive;">What next?</p>
  <div class="second-section" style=" display: flex; flex-direction: row; padding:
  2rem; width: 90%; ">
    <div>
      <h3 style ="font-family: 'Lato', cursive;">Verify your identity to access more features It's easy, secure and
        faster than you might think. Once verified, you can buy and sell
        crypto and use multiple payment methods.Get verified from your
        lightPay account.
      </h3>
    </div>
  </div>
  <hr class="horizonal-line" />
  <div class="third-section" style=" display: flex;
  flex-direction: row; padding: 2rem;font-family: 'Lato', cursive; ">
    <div>
      <h3  style="font-family: 'Lato', cursive;">Payment Method</h3>
      <p>Explore our diverse assets, with more added regularly</p>
    </div>
    <div>
      <h3 style="font-family: 'Lato', cursive;">Payment Method</h3>
      <p style="font-family: 'Lato', cursive;">Get Bitcoin, ETH or Doge using your local currency</p>
    </div>
    <div>
      <h3 style="font-family: 'Lato', cursive;">Payment Method</h3>
      <p style="font-family: 'Lato', cursive;">Master the space with our sharp Crypto Guides
      </p>
    </div>
  </div>
  </div>
  <div> <p style=" text-align: center;font-family: 'Lato';" >Copyright &copy; 2022 LightPay, Inc</p>
  </div>
  </div>
  `;
  return registrationHTML;
  }