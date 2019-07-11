workflow "CI" {
  resolves = [
    "Lint",
    "Build",
    "Test",
  ]
  on = "pull_request"
}

action "Install" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  args = "install"
  runs = "yarn"
}

action "Lint" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  needs = ["Install"]
  runs = "yarn"
  args = "lint"
}

action "Build" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  needs = ["Install"]
  runs = "yarn"
  args = "build"
}

action "Test" {
  uses = "willsoto/node-lts-browsers@master"
  needs = ["Install"]
  runs = "yarn"
  args = "test"
}
