"use strict";

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = void 0 && (void 0).__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

function handleAddClient(ev) {
  return __awaiter(this, void 0, Promise, function () {
    var formData, newClient, response, error_1;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          ev.preventDefault();
          formData = new FormData(ev.target);
          newClient = {
            firstName: formData.get("firstName"),
            lastName: formData.get("lastName"),
            email: formData.get("email"),
            phoneNumber: formData.get("phoneNumber"),
            address: formData.get("address")
          };
          _a.label = 1;

        case 1:
          _a.trys.push([1, 6,, 7]);

          return [4
          /*yield*/
          , fetch("/api/clients/add-client", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(newClient)
          })];

        case 2:
          response = _a.sent();
          if (!response.ok) return [3
          /*break*/
          , 4];
          console.log("Client added successfully");
          ev.target.reset();
          return [4
          /*yield*/
          , fetchAllClients()];

        case 3:
          _a.sent();

          return [3
          /*break*/
          , 5];

        case 4:
          throw new Error("Failed to add client");

        case 5:
          return [3
          /*break*/
          , 7];

        case 6:
          error_1 = _a.sent();
          console.error("Error adding client:", error_1);
          return [3
          /*break*/
          , 7];

        case 7:
          return [2
          /*return*/
          ];
      }
    });
  });
}

function fetchAllClients() {
  return __awaiter(this, void 0, Promise, function () {
    var response, clients, error_2;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 3,, 4]);

          return [4
          /*yield*/
          , fetch("/api/clients/get-all-clients")];

        case 1:
          response = _a.sent();
          if (!response.ok) throw new Error("Failed to fetch clients");
          return [4
          /*yield*/
          , response.json()];

        case 2:
          clients = _a.sent();
          renderClients(clients);
          return [3
          /*break*/
          , 4];

        case 3:
          error_2 = _a.sent();
          console.error("Error fetching clients:", error_2);
          return [3
          /*break*/
          , 4];

        case 4:
          return [2
          /*return*/
          ];
      }
    });
  });
}

function renderClients(clients) {
  var container = document.getElementById("client-list");
  if (!container) return;
  container.innerHTML = "\n        <table>\n            <thead>\n                <tr>\n                    <th>First Name</th>\n                    <th>Last Name</th>\n                    <th>Email</th>\n                    <th>Phone Number</th>\n                    <th>Address</th>\n                    <th>Actions</th>\n                </tr>\n            </thead>\n            <tbody>\n                " + clients.map(function (client) {
    return "\n                        <tr id=\"client-" + client._id + "\">\n                            <td>" + client.firstName + "</td>\n                            <td>" + client.lastName + "</td>\n                            <td>" + client.email + "</td>\n                            <td>" + client.phoneNumber + "</td>\n                            \n                            <td>\n                                <button onclick=\"setClients('update', '" + client._id + "')\">Edit</button>\n                                <button onclick=\"setClients('delete', '" + client._id + "')\">Delete</button>\n                            </td>\n                        </tr>\n                    ";
  }).join("") + "\n            </tbody>\n        </table>\n    "; // <td>${client.address}</td> todo: add up
}

function setClients(action, id) {
  var _a;

  return __awaiter(this, void 0, Promise, function () {
    var response, error_3, updatedFirstName, updatedLastName, updatedEmail, updatedPhoneNumber, updatedAddress, response, error_4;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          if (!(action === "delete")) return [3
          /*break*/
          , 5];
          _b.label = 1;

        case 1:
          _b.trys.push([1, 3,, 4]);

          return [4
          /*yield*/
          , fetch("/api/clients/delete-client", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              id: id
            })
          })];

        case 2:
          response = _b.sent();

          if (response.ok) {
            (_a = document.getElementById("client-" + id)) === null || _a === void 0 ? void 0 : _a.remove();
          } else {
            throw new Error("Failed to delete client");
          }

          return [3
          /*break*/
          , 4];

        case 3:
          error_3 = _b.sent();
          console.error("Error deleting client:", error_3);
          return [3
          /*break*/
          , 4];

        case 4:
          return [3
          /*break*/
          , 12];

        case 5:
          if (!(action === "update")) return [3
          /*break*/
          , 12];
          updatedFirstName = prompt("Enter new first name:");
          updatedLastName = prompt("Enter new last name:");
          updatedEmail = prompt("Enter new email:");
          updatedPhoneNumber = prompt("Enter new phone number:");
          updatedAddress = prompt("Enter new address:");
          if (!updatedFirstName || !updatedLastName || !updatedEmail || !updatedPhoneNumber || !updatedAddress) return [2
          /*return*/
          ];
          _b.label = 6;

        case 6:
          _b.trys.push([6, 11,, 12]);

          return [4
          /*yield*/
          , fetch("/api/clients/update-client", {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              id: id,
              updates: {
                firstName: updatedFirstName,
                lastName: updatedLastName,
                email: updatedEmail,
                phoneNumber: updatedPhoneNumber,
                address: updatedAddress
              }
            })
          })];

        case 7:
          response = _b.sent();
          if (!response.ok) return [3
          /*break*/
          , 9];
          return [4
          /*yield*/
          , fetchAllClients()];

        case 8:
          _b.sent();

          return [3
          /*break*/
          , 10];

        case 9:
          throw new Error("Failed to update client");

        case 10:
          return [3
          /*break*/
          , 12];

        case 11:
          error_4 = _b.sent();
          console.error("Error updating client:", error_4);
          return [3
          /*break*/
          , 12];

        case 12:
          return [2
          /*return*/
          ];
      }
    });
  });
}

function renderClientForm() {
  var container = document.getElementById("client-form-container");
  if (!container) return;
  container.innerHTML = "\n        <form id=\"client-form\">\n            <label for=\"firstName\">First Name:</label>\n            <input type=\"text\" id=\"firstName\" name=\"firstName\" required />\n            \n            <label for=\"lastName\">Last Name:</label>\n            <input type=\"text\" id=\"lastName\" name=\"lastName\" required />\n            \n            <label for=\"email\">Email:</label>\n            <input type=\"email\" id=\"email\" name=\"email\" required />\n            \n            <label for=\"phoneNumber\">Phone Number:</label>\n            <input type=\"text\" id=\"phoneNumber\" name=\"phoneNumber\" required />\n            \n            <label for=\"address\">Address:</label>\n            <input type=\"text\" id=\"address\" name=\"address\" required />\n            \n            <button type=\"submit\">Add Client</button>\n        </form>\n    ";
  var form = document.getElementById("client-form");
  if (form) form.addEventListener("submit", handleAddClient);
}

window.onload = function () {
  renderClientForm();
  fetchAllClients();
};