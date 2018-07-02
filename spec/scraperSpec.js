const Scraper = require("../src/scraper");

describe("The Basic Web Scraper", function() {
  describe("adding new html to the web scraper", function() {
    beforeEach(function () {
      testScraper = new Scraper();
      testString = "<h1>Hello World</h1>";
      formattedString = "Hello World";
      testScraper.addData(testString);
    });
    it("adds the unformatted HTML as an argument", function() {
      expect(testScraper.unformattedString).toEqual(testString);
    });
    it("parses the string data for the html", function() {
      testScraper.formatString();
      expect(testScraper.formattedString.text()).toEqual(formattedString);
    });
  }); 
});

describe("Selecting HTML Based On The Data Type", function() {
  beforeEach(function() {
    testScraper = new Scraper();
    testString = "<div class = find_me>";
    for (i = 0; i < 10; i++) {
      testString += "<li>Hello " + i + "</li>";
    }
    testString+= "</div>";
  });
  it("selects the HTML type based on the argument sent to the function", function() {
    testString+="<p>IGNORE ME</p>";
    testScraper.addData(testString);
    testScraper.formatString();
    testScraper.selectHTML(".find_me", "li");
    expect(testScraper.savedString.join().includes("IGNORE ME")).toBe(false);
  });
  it("selects the exact HTML that's specified in the function", function() {
    testScraper.addData(testString);
    testScraper.formatString();
    testScraper.selectHTML(".find_me", "li");
    var matchedString = "";
    for(i = 0; i < 10; i++) {
      matchedString += "Hello " + i + ",";
    }
    matchedString = matchedString.trim();
    expect(testScraper.savedString.join()).toEqual(matchedString.slice(0, matchedString.length - 1)); 
  });

  describe("Selecting numeric data that has HTML tag with whitespace", function() {
    beforeEach(function() {
      numericString = "<div class = find_me space>"
      for(i = 1; i <= 10; i++) {
        numericString+= ` <p>${i * i}</p>`;
      }
      numericString+= `</div>`;
    });
    it("selects the string data if the class has a name in it", function() {
      testScraper.addData(numericString);
      testScraper.formatString();
      testScraper.selectHTML(".find_me", "p");
      expect(testScraper.savedString.join()).toEqual("1,4,9,16,25,36,49,64,81,100")
    });
  });

});

