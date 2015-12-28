function LayoutComponent() {
  this.myName = "Alice";
}

DisplayComponent.annotations = [
  new angular.ComponentAnnotation({
    //selector: "display"
  }),
  new angular.ViewAnnotation({
    templateUrl: 'layout.view.html'
  })
];
