const EmailGlobalStyle = () => {
  return (
    <style>
      {`
            body {
              margin: 0;
              padding: 20px;
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
              background: #FFFFFF;
              color: #181D27;
              max-width: 640px;
              margin-left: auto;
              margin-right: auto;
            }
            
            h1 {
              font-size: 30px;
              line-height: 38px;
              letter-spacing: 0;
              font-weight: 600;
              color: #181D27;
            }
            
            p {
              font-weight: 400;
              font-size: 16px;
              line-height: 24px;
              letter-spacing: 0;
              color: #414651;
            }

            a.buttonLink {
              font-size: 16px;
              font-weight: 600;
              line-height: 24px;
              text-decoration: none;
              display: inline-block;
              color: #ffffff;
              background-color: #7F56D9;
              border-radius: 8px;
              padding: 10px 16px;
            }
            
            a.buttonLink:hover {
              background-color: #6941C6;
            }

            @media (prefers-color-scheme: dark) {
              body {
                background: #0A0D12;
                color: #FFFFFF;
              }
              
              h1 {
                color: #FAFAFA;
              }
              
              p {
                color: #F5F5F5;
              }
            }
          `}
    </style>
  )
}

export { EmailGlobalStyle }
