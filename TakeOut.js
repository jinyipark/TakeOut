if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      console.log(Meteor.users);
      return Session.get('counter');
    }
  });

  Template.feed.helpers({
    posts: function () {
        return Posts.find();
      }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });

Template.email.events({
    "click #emailAdd": function(event) {
      event.preventDefault();

      Meteor.call('sendEmail',
            (Meteor.users.findOne({_id : this.ownerID})).emails[0].address,
            Meteor.user().emails[0].address,
            'Hello from Meteor!',
            'This is a test of Email.send.');
      }
  });

  Template.signupForm.events({
    "submit #signup-form": function(event) {
      event.preventDefault();
      Accounts.createUser({
        username: event.target.signupusername.value,
        password: event.target.signuppassword.value,
        email: event.target.signupEmail.value,
        profile: {
          firstName: event.target.signupFirstName.value,
          lastName: event.target.signupLastName.value,
          accountType: event.target.accountType.value,
          itemsDonated: 0,
          itemsPickedUp: 0,
          signupDate: new Date()
        }
      }, function(error) {
        if (error) {
          // Display the user creation error to the user however you want
        }
        else
        {
          Router.go('/profile');
        }

        return false;
      });
    }
  });

  Template.loginForm.events({
    "submit #login-form": function(event) {
      event.preventDefault();
      console.log(event);
      console.log("Test - " + event.target.loginusername.value);
      Meteor.loginWithPassword(
        event.target.loginusername.value,
        event.target.loginpassword.value,
        function(error) {
          if (error) {
            // Display the login error to the user however you want
          }
          else
          {
            Router.go('/profile');
          }
        }
      );
    }
  });

  Template.logoutForm.events({
    "click .logoutLink": function(event) {
      event.preventDefault();
      Meteor.logout(function(error) {
        if (error) {
          // Display the logout error to the user however you want
        }
      });
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup

    Meteor.methods({
      sendEmail: function (to, from, subject, text) {

        var options = {
            apiKey: 'key-2912fabf1546af438ae9524bf8d71308',
            domain: 'sandbox27eb015c13cb43198dc3d8526e3354b6.mailgun.org'
        }

        var NigerianPrinceGun = new Mailgun(options);
        NigerianPrinceGun.send({
         'to': to,
         'from': from,
         'html': '<html><head></head><body>'+text+'</body></html>',
         'text': text,
         'subject': subject,
         'tags': [
             'some',
             'test',
             'tags'
         ]
     });
        }
    });
  });
}

Router.route('/', function () {
  // render the Home template with a custom data context
  this.layout('LayoutOne');

  this.render('homepage');
});

Router.route('/signup', function () {
  // render the Home template with a custom data context
  this.layout('LayoutOne');

  this.render('signupstuff');
});

Router.route('/profile', function () {
  this.layout('LayoutOne');
  // render the Home template with a custom data context
  this.render('profile');
});

Router.route('/feed', function () {
  this.layout('LayoutOne');
  // render the Home template with a custom data context
  this.render('feed');
});

Router.route('/additem', function () {
  this.layout('LayoutOne');
  // render the Home template with a custom data context
  this.render('additem');
});