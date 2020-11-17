var $document = $( document );
var plugins = {
  responsiveTabs: $( ".responsive-tabs" ),
  regula: $( "[data-constraints]" )
};

$document.ready( function () {

  function attachFormValidator ( elements ) {
    for ( var i = 0; i < elements.length; i++ ) {
      var o = $( elements[ i ] ), v;
      o.addClass( "form-control-has-validation" ).after( "<span class='form-validation'></span>" );
      v = o.parent().find( ".form-validation" );
      if ( v.is( ":last-child" ) ) {
        o.addClass( "form-control-last-child" );
      }
    }

    elements
      .on( 'input change propertychange blur', function ( e ) {
        var $this = $( this ), results;

        if ( e.type !== "blur" ) {
          if ( !$this.parent().hasClass( "has-error" ) ) {
            return;
          }
        }

        if ( $this.parents( '.rd-mailform' ).hasClass( 'success' ) ) {
          return;
        }

        if ( (results = $this.regula( 'validate' )).length ) {
          for ( i = 0; i < results.length; i++ ) {
            $this.siblings( ".form-validation" ).text( results[ i ].message ).parent().addClass( "has-error" )
          }
        } else {
          $this.siblings( ".form-validation" ).text( "" ).parent().removeClass( "has-error" )
        }
      } )
      .regula( 'bind' );

    var regularConstraintsMessages = [
      {
        type: regula.Constraint.Required,
        newMessage: "This field is required."
      }
    ];

    for ( var i = 0; i < regularConstraintsMessages.length; i++ ) {
      var regularConstraint = regularConstraintsMessages[ i ];

      regula.override( {
        constraintType: regularConstraint.type,
        defaultMessage: regularConstraint.newMessage
      } );
    }
  }

  function isValidated ( elements, captcha ) {
    var results, errors = 0;

    if ( elements.length ) {
      for ( j = 0; j < elements.length; j++ ) {

        var $input = $( elements[ j ] );
        if ( (results = $input.regula( 'validate' )).length ) {
          for ( k = 0; k < results.length; k++ ) {
            errors++;
            $input.siblings( ".form-validation" ).text( results[ k ].message ).parent().addClass( "has-error" );
          }
        } else {
          $input.siblings( ".form-validation" ).text( "" ).parent().removeClass( "has-error" )
        }
      }

      return errors == 0;
    }
    return true;
  }

  if ( plugins.responsiveTabs.length ) {
    var i = 0;
    for ( i = 0; i < plugins.responsiveTabs.length; i++ ) {
      var $this = $( plugins.responsiveTabs[ i ] );
      $this.easyResponsiveTabs( {
        type: $this.attr( "data-type" ),
        tabidentify: $this.find( ".resp-tabs-list" ).attr( "data-group" ) || "tab"
      } );
    }
  }

  if ( plugins.regula.length ) {
    attachFormValidator( plugins.regula );
  }

});