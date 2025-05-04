/**
 * Code for MsEE Project Map using sigma.js
 * made by Pablo Cardenas based on sigma.js example code
 */

mobileCheck = function () {
  // from detectmobilebrowsers.com
  let check = false;
  (function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        a,
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4),
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
};

const MOBILE = mobileCheck();

const LAB_COLOR = "#E9C46A";
var lab_color = LAB_COLOR;
if (!MOBILE) lab_color = "rgba(0,0,0,0)";
const BRANCH_COLOR = "rgba(0,0,0,0)";
const TOPIC_COLOR = "#E76F51"; // unused
var branch_color = BRANCH_COLOR;
if (MOBILE) branch_color = TOPIC_COLOR;
const TOOL_COLOR = "#F4A261";
const QUESTION_COLOR = "#2A9D8F";
const OBJECTIVE_COLOR = "#264653"; // unused

const EDGE_SIZE = 2;
const INIT_SEARCH_TERM = "Search term...";
const DEFAULT_TXT =
  "<p>Large nodes are <b>areas of research</b>.</p>" +
  "<p>Smaller, colored nodes are <b>projects</b>, understood as drivers or motivators of research. " +
  'These come in two types: those aimed at <b><font color="' +
  QUESTION_COLOR +
  '">answering questions</font></b> to understand phenomena ' +
  'and those aimed at <b><font color="' +
  TOOL_COLOR +
  '">building tools</font></b> capable of achieving objectives.</p>' +
  "<p>Connections between projects denote <b>direct synergies</b>. Connections to research areas denote <b>belonging</b>.</p>" +
  '<p>Read more about us at <b><a href="https://mseelab.org/" target="_blank">mseelab.org</a></b>. Interested? <b><a href="./index.html#contact">Reach out!</a></b></p>' +
  "Go on and explore. ";

const TEAM_DICT = {
  "Pablo Cárdenas R.":
    '<a href="https://mseelab.org/members.html#pablocr"><img alt="Pablo" title="Pablo" class="team_pics" src="./assets/img/members/pablo-biorxiv-face.jpg"/></a>',
};

const OMITTED_WORDS = [
  "",
  "a",
  "an",
  "the",
  "and",
  "or",
  "but",
  "nor",
  "for",
  "yet",
  "so",
  "although",
  "because",
  "since",
  "unless",
  "while",
  "whereas",
  "if",
  "though",
  "even though",
  "whether",
  "about",
  "above",
  "across",
  "after",
  "against",
  "along",
  "among",
  "around",
  "at",
  "before",
  "behind",
  "below",
  "beneath",
  "beside",
  "between",
  "beyond",
  "by",
  "despite",
  "down",
  "during",
  "except",
  "for",
  "from",
  "in",
  "inside",
  "into",
  "like",
  "near",
  "of",
  "off",
  "on",
  "onto",
  "out",
  "outside",
  "over",
  "past",
  "since",
  "through",
  "throughout",
  "to",
  "toward",
  "under",
  "underneath",
  "until",
  "up",
  "upon",
  "with",
  "within",
  "without",
  "is",
  "are",
  "was",
  "were",
  "be",
  "been",
  "being",
  "am",
  "do",
  "does",
  "did",
  "have",
  "has",
  "had",
  "having",
  "can",
  "could",
  "shall",
  "should",
  "will",
  "would",
  "may",
  "might",
  "must",
  "not",
  "no",
  "yes",
  "very",
  "too",
  "just",
  "only",
  "such",
  "that",
  "this",
  "these",
  "those",
  "each",
  "every",
  "all",
  "some",
  "any",
  "either",
  "neither",
  "both",
  "many",
  "much",
  "more",
  "most",
  "few",
  "less",
  "least",
  "several",
  "we",
  "it",
  "us",
  "how",
  "href",
  "https",
  "http",
  "www",
  "com",
  "org",
  "et",
  "al",
];

const tools_btn = document.getElementById("tools_btn");
const questions_btn = document.getElementById("questions_btn");
const planned_btn = document.getElementById("planned_btn");
const active_btn = document.getElementById("active_btn");
const archived_btn = document.getElementById("archived_btn");
const wet_btn = document.getElementById("wet_btn");
const dry_btn = document.getElementById("dry_btn");
const combined_btn = document.getElementById("combined_btn");
const labels_btn = document.getElementById("labels_btn");

var tools_show = true;
var questions_show = true;
var planned_show = true;
var active_show = true;
var archived_show = true;
var wet_show = true;
var dry_show = true;
var combined_show = true;
var labels_show = false;

const search_ui = document.getElementById("search_box");
const search_terms_ui = document.getElementById("search_terms");

const node_info_ui = document.getElementById("node_info");

const graph = new graphology.Graph();
// used to temporarily fill the renderer
var renderer = new Sigma(
  // declared here to make it accessible to other functions
  graph,
  document.getElementById("sigma-container"),
  {
    // defaultNodeType: "image",
    nodeProgramClasses: {
      image: Sigma.rendering.createNodeImageProgram(),
    },
  },
);
renderer.setSetting("hideEdgesOnMove", MOBILE);
renderer.setSetting("hideLabelsOnMove", MOBILE);
renderer.setSetting("labelFont", "Cabin");
if (MOBILE) renderer.setSetting("labelSize", 28);

Papa.parse("./dat/projects.csv", {
  download: true,
  header: true,
  delimiter: ",",
  // on row load, make a new node
  step: function (row) {
    if (MOBILE) {
      if (row.data.ID == "MsEE") {
        graph.addNode(row.data.ID, {
          x: 0,
          y: 0,
          color: "rgba(0,0,0,1)",
          originalColor: "rgba(0,0,0,1)",
          size: 60,
          labelWeight: "bold",
          labelSize: 20,
          name: row.data.Name,
          id: row.data.ID,
          label: row.data.Name,
          nodeType: row.data.Type, // "type" conflicts with an existing node property
          methodology: row.data.Methodology,
          status: row.data.Status,
          years: row.data.Years,
          team: row.data.Team,
          collaborators: row.data.Collaborators,
          funding: row.data.Funding,
          products: row.data.Products,
          notebook: row.data.Notebook,
          connections: row.data.Connections,
          content: row.data.Content,
          displayed: true,
          show_label: true,
        });
      } else if (row.data.ID == "SynBio") {
        graph.addNode(row.data.ID, {
          x: 0,
          y: -100,
          color: "rgba(0,0,0,1)",
          originalColor: "rgba(0,0,0,1)",
          size: 30,
          labelWeight: "bold",
          labelSize: 20,
          name: row.data.Name,
          id: row.data.ID,
          label: row.data.ID,
          nodeType: row.data.Type, // "type" conflicts with an existing node property
          methodology: row.data.Methodology,
          status: row.data.Status,
          years: row.data.Years,
          team: row.data.Team,
          collaborators: row.data.Collaborators,
          funding: row.data.Funding,
          products: row.data.Products,
          notebook: row.data.Notebook,
          connections: row.data.Connections,
          content: row.data.Content,
          displayed: true,
          show_label: true,
        });
      } else if (row.data.ID == "CompMod") {
        graph.addNode(row.data.ID, {
          x: -1000,
          y: 0,
          color: "rgba(0,0,0,1)",
          originalColor: "rgba(0,0,0,1)",
          size: 30,
          labelWeight: "bold",
          name: row.data.Name,
          id: row.data.ID,
          label: row.data.ID,
          nodeType: row.data.Type, // "type" conflicts with an existing node property
          methodology: row.data.Methodology,
          status: row.data.Status,
          years: row.data.Years,
          team: row.data.Team,
          collaborators: row.data.Collaborators,
          funding: row.data.Funding,
          products: row.data.Products,
          notebook: row.data.Notebook,
          connections: row.data.Connections,
          content: row.data.Content,
          displayed: true,
          show_label: true,
        });
      } else if (row.data.ID == "Applications") {
        graph.addNode(row.data.ID, {
          x: -100,
          y: 0,
          color: "rgba(0,0,0,1)",
          originalColor: "rgba(0,0,0,1)",
          size: 30,
          labelWeight: "bold",
          name: row.data.Name,
          id: row.data.ID,
          label: row.data.ID,
          nodeType: row.data.Type, // "type" conflicts with an existing node property
          methodology: row.data.Methodology,
          status: row.data.Status,
          years: row.data.Years,
          team: row.data.Team,
          collaborators: row.data.Collaborators,
          funding: row.data.Funding,
          products: row.data.Products,
          notebook: row.data.Notebook,
          connections: row.data.Connections,
          content: row.data.Content,
          displayed: true,
          show_label: true,
        });
      } else if (row.data.ID != null) {
        graph.addNode(row.data.ID, {
          x: 0,
          y: 0,
          color: "rgba(0,0,0,1)",
          originalColor: "rgba(0,0,0,1)",
          size: 10,
          name: row.data.Name,
          id: row.data.ID,
          label: "",
          nodeType: row.data.Type, // "type" conflicts with something internal?
          methodology: row.data.Methodology,
          status: row.data.Status,
          years: row.data.Years,
          team: row.data.Team,
          collaborators: row.data.Collaborators,
          funding: row.data.Funding,
          products: row.data.Products,
          notebook: row.data.Notebook,
          connections: row.data.Connections,
          content: row.data.Content,
          displayed: true,
          show_label: true,
        });
      }
    } else {
      if (row.data.ID == "MsEE") {
        graph.addNode(row.data.ID, {
          x: 0,
          y: 0,
          type: "image",
          image: "./assets/img/msee_logo-gray.png",
          // we start with gray images and then replace with colored so they're all loaded
          originalImage: "./assets/img/msee_logo_border.png",
          grayImage: "./assets/img/msee_logo-gray.png",
          color: "rgba(0,0,0,1)",
          originalColor: "rgba(0,0,0,1)",
          size: 60,
          labelWeight: "bold",
          labelSize: 20,
          name: row.data.Name,
          id: row.data.ID,
          label: "",
          nodeType: row.data.Type, // "type" conflicts with an existing node property
          methodology: row.data.Methodology,
          status: row.data.Status,
          years: row.data.Years,
          team: row.data.Team,
          collaborators: row.data.Collaborators,
          funding: row.data.Funding,
          products: row.data.Products,
          notebook: row.data.Notebook,
          connections: row.data.Connections,
          content: row.data.Content,
          displayed: true,
          show_label: true,
        });
      } else if (row.data.ID == "SynBio") {
        graph.addNode(row.data.ID, {
          x: 0,
          y: -100,
          type: "image",
          image: "./assets/img/synbio-melanconnie-gray.png",
          originalImage: "./assets/img/synbio-melanconnie.png",
          grayImage: "./assets/img/synbio-melanconnie-gray.png",
          color: "rgba(0,0,0,1)",
          originalColor: "rgba(0,0,0,1)",
          size: 30,
          labelWeight: "bold",
          labelSize: 20,
          name: row.data.Name,
          id: row.data.ID,
          label: "",
          nodeType: row.data.Type, // "type" conflicts with an existing node property
          methodology: row.data.Methodology,
          status: row.data.Status,
          years: row.data.Years,
          team: row.data.Team,
          collaborators: row.data.Collaborators,
          funding: row.data.Funding,
          products: row.data.Products,
          notebook: row.data.Notebook,
          connections: row.data.Connections,
          content: row.data.Content,
          displayed: true,
          show_label: true,
        });
      } else if (row.data.ID == "CompMod") {
        graph.addNode(row.data.ID, {
          x: -1000,
          y: 0,
          type: "image",
          image: "./assets/img/population-melanconnie-gray.png",
          originalImage: "./assets/img/population-melanconnie.png",
          grayImage: "./assets/img/population-melanconnie-gray.png",
          color: "rgba(0,0,0,1)",
          originalColor: "rgba(0,0,0,1)",
          size: 30,
          labelWeight: "bold",
          name: row.data.Name,
          id: row.data.ID,
          label: "",
          nodeType: row.data.Type, // "type" conflicts with an existing node property
          methodology: row.data.Methodology,
          status: row.data.Status,
          years: row.data.Years,
          team: row.data.Team,
          collaborators: row.data.Collaborators,
          funding: row.data.Funding,
          products: row.data.Products,
          notebook: row.data.Notebook,
          connections: row.data.Connections,
          content: row.data.Content,
          displayed: true,
          show_label: true,
        });
      } else if (row.data.ID == "Applications") {
        graph.addNode(row.data.ID, {
          x: -100,
          y: 0,
          type: "image",
          image: "./assets/img/earth-melanconnie-gray.png",
          originalImage: "./assets/img/earth-melanconnie.png",
          grayImage: "./assets/img/earth-melanconnie-gray.png",
          color: "rgba(0,0,0,1)",
          originalColor: "rgba(0,0,0,1)",
          size: 30,
          labelWeight: "bold",
          name: row.data.Name,
          id: row.data.ID,
          label: "",
          nodeType: row.data.Type, // "type" conflicts with an existing node property
          methodology: row.data.Methodology,
          status: row.data.Status,
          years: row.data.Years,
          team: row.data.Team,
          collaborators: row.data.Collaborators,
          funding: row.data.Funding,
          products: row.data.Products,
          notebook: row.data.Notebook,
          connections: row.data.Connections,
          content: row.data.Content,
          displayed: true,
          show_label: true,
        });
      } else if (row.data.ID != null) {
        graph.addNode(row.data.ID, {
          x: 0,
          y: 0,
          color: "rgba(0,0,0,1)",
          originalColor: "rgba(0,0,0,1)",
          size: 10,
          name: row.data.Name,
          id: row.data.ID,
          label: "",
          nodeType: row.data.Type, // "type" conflicts with something internal?
          methodology: row.data.Methodology,
          status: row.data.Status,
          years: row.data.Years,
          team: row.data.Team,
          collaborators: row.data.Collaborators,
          funding: row.data.Funding,
          products: row.data.Products,
          notebook: row.data.Notebook,
          connections: row.data.Connections,
          content: row.data.Content,
          displayed: true,
          show_label: true,
        });
      }
    }
  },
  // when done loading, continue
  complete: function (data) {
    // add edges
    graph.forEachNode((node) => {
      graph
        .getNodeAttribute(node, "connections")
        .split(", ")
        .forEach((connection) => {
          if (connection != "") {
            if (connection == "MsEE" || node == "MsEE") {
              graph.addEdge(node, connection, {
                size: EDGE_SIZE * 2,
                color: "#AAA",
              });
            } else {
              graph.addEdge(node, connection, {
                size: EDGE_SIZE,
              });
            }
          }
        });
    });

    // compute forceatlas2 positions
    graphologyLibrary.layout.circular.assign(graph);
    const settings = graphologyLibrary.layoutForceAtlas2.inferSettings(graph);
    graphologyLibrary.layoutForceAtlas2.assign(graph, {
      settings,
      iterations: 600,
    });

    renderer.on("enterNode", (e) => {
      graph.setNodeAttribute(
        e.node,
        "label",
        graph.getNodeAttribute(e.node, "name"),
      );
    });

    renderer.on("leaveNode", (e) => {
      if (
        !graph.getNodeAttribute(e.node, "show_label") &&
        (!MOBILE ||
          (MOBILE &&
            (e.node != "MsEE" ||
              e.node != "SynBio" ||
              e.node != "CompMod" ||
              e.node != "Applications")))
      ) {
        graph.setNodeAttribute(e.node, "label", "");
      }
    });

    // Drag'n'drop feature
    // ~~~~~~~~~~~~~~~~~~~

    // Create the spring layout and start it
    // this was changed from ForceSupervisor() to graphologyLibrary.ForceLayout()
    if (!MOBILE) {
      const layout = new graphologyLibrary.ForceLayout(graph, {
        isNodeFixed: function (node, attr) {
          if (attr.highlighted || attr.nodeType == "Lab") {
            return true;
          } else return false;
        },
      });
      layout.start();
    }

    // State for drag'n'drop
    let draggedNode = null;
    let isDragging = false;

    // On mouse down on a node
    //  - we enable the drag mode
    //  - save in the dragged node in the state
    //  - highlight the node
    //  - disable the camera so its state is not updated
    renderer.on("downNode", (e) => {
      isDragging = true;
      draggedNode = e.node;
      graph.setNodeAttribute(draggedNode, "highlighted", true);
      if (!renderer.getCustomBBox()) renderer.setCustomBBox(renderer.getBBox());
    });

    // On mouse move, if the drag mode is enabled, we change the position of the draggedNode
    renderer.on("moveBody", ({ event }) => {
      if (!isDragging) return;

      // Get new position of node
      const pos = renderer.viewportToGraph(event);

      graph.setNodeAttribute(draggedNode, "x", pos.x);
      graph.setNodeAttribute(draggedNode, "y", pos.y);

      // Prevent sigma to move camera:
      event.preventSigmaDefault();
      event.original.preventDefault();
      event.original.stopPropagation();
    });

    // On mouse up, we reset the dragging mode
    const handleUp = () => {
      if (draggedNode) {
        graph.removeNodeAttribute(draggedNode, "highlighted");
      }
      isDragging = false;
      draggedNode = null;
    };
    renderer.on("upNode", handleUp);
    renderer.on("upStage", handleUp);

    // 4. Add colors to the nodes, based on node types:
    graph.forEachNode((node, attributes) => {
      if (attributes.nodeType == "Lab") {
        graph.setNodeAttribute(node, "color", lab_color);
        graph.setNodeAttribute(node, "originalColor", lab_color);
      } else if (attributes.nodeType == "Branch") {
        graph.setNodeAttribute(node, "color", branch_color);
        graph.setNodeAttribute(node, "originalColor", branch_color);
      } else if (attributes.nodeType == "Topic") {
        graph.setNodeAttribute(node, "color", TOPIC_COLOR);
        graph.setNodeAttribute(node, "originalColor", TOPIC_COLOR);
      } else if (attributes.nodeType == "Tool") {
        graph.setNodeAttribute(node, "color", TOOL_COLOR);
        graph.setNodeAttribute(node, "originalColor", TOOL_COLOR);
      } else if (attributes.nodeType == "Question") {
        graph.setNodeAttribute(node, "color", QUESTION_COLOR);
        graph.setNodeAttribute(node, "originalColor", QUESTION_COLOR);
      } else if (attributes.nodeType == "Objective") {
        graph.setNodeAttribute(node, "color", OBJECTIVE_COLOR);
        graph.setNodeAttribute(node, "originalColor", OBJECTIVE_COLOR);
      }
    });

    // 5. Use degrees for node sizes:
    const degrees = graph.nodes().map((node) => graph.degree(node));
    const minDegree = Math.min(...degrees);
    const maxDegree = Math.max(...degrees);
    const minSize = 10,
      maxSize = 30;
    graph.forEachNode((node) => {
      if (
        node != "MsEE" &&
        node != "SynBio" &&
        node != "CompMod" &&
        node != "Applications"
      ) {
        const degree = graph.degree(node);
        graph.setNodeAttribute(
          node,
          "size",
          minSize +
            ((degree - minDegree + 1) / (maxDegree - minDegree + 1)) *
              (maxSize - minSize),
        );
      }
    });

    // This is to then modify colors and have something to return to:
    renderer.graph.nodes().forEach(function (n) {
      graph.setNodeAttribute(
        n,
        "originalColor",
        graph.getNodeAttribute(n, "color"),
      );
      if (
        !MOBILE &&
        (n == "MsEE" || n == "SynBio" || n == "CompMod" || n == "Applications")
      ) {
        graph.setNodeAttribute(
          n,
          "image",
          graph.getNodeAttribute(n, "originalImage"),
        ); // set it to its original color
      }
    });
    renderer.graph.edges().forEach(function (e) {
      graph.setEdgeAttribute(
        e,
        "originalColor",
        graph.getEdgeAttribute(e, "color"),
      );
      graph.setEdgeAttribute(e, "source", graph.getSourceAttribute(e, "id"));
      graph.setEdgeAttribute(e, "target", graph.getTargetAttribute(e, "id"));
    });

    /**
     * Selects a node by given ID
     */
    function selectNode(nodeId) {
      var toKeep = []; // object contains nodes to render as neighbors
      renderer.graph.neighbors(nodeId).forEach(function (n) {
        if (graph.getNodeAttribute(n, "displayed")) {
          toKeep.push(n);
        }
      });
      toKeep.push(nodeId); // add selected node as one of the ones to be rendered

      // We loop across all edges in graph:
      renderer.graph.edges().forEach(function (e) {
        if (
          (graph.getSourceAttribute(e, "id") == nodeId &&
            graph.getSourceAttribute(e, "displayed")) ||
          (graph.getTargetAttribute(e, "id") == nodeId &&
            graph.getSourceAttribute(e, "displayed"))
        ) {
          // if touching the selected node being redrawn
          graph.setEdgeAttribute(e, "color", "#56B4E9"); // make blue!
        } else if (
          toKeep.includes(graph.getSourceAttribute(e, "id")) &&
          toKeep.includes(graph.getTargetAttribute(e, "id"))
        ) {
          // if touching 2 of the nodes being redrawn
          graph.setEdgeAttribute(
            e,
            "color",
            graph.getEdgeAttribute(e, "originalColor"),
          ); // make this edge have its original color
        } else if (
          toKeep.includes(graph.getSourceAttribute(e, "id")) ||
          toKeep.includes(graph.getTargetAttribute(e, "id"))
        ) {
          // if touching one of the nodes being redrawn
          graph.setEdgeAttribute(e, "color", "#eee"); // otherwise make it light gray
        } else graph.setEdgeAttribute(e, "color", "#eee"); // otherwise make it light gray
      });

      // We loop across all nodes in graph:
      renderer.graph.nodes().forEach(function (n) {
        if (toKeep.includes(n)) {
          // if this is the selected node or one of its neighbors,
          showNode(n);
          graph.setNodeAttribute(n, "show_label", true);
          graph.setNodeAttribute(n, "label", graph.getNodeAttribute(n, "name"));
        } // if not a neighbor or selected node,
        else {
          grayNode(n);
        }
      });

      // This shows node info:
      if (
        nodeId == "MsEE" ||
        nodeId == "SynBio" ||
        nodeId == "CompMod" ||
        nodeId == "Applications"
      ) {
        node_info_ui.innerHTML =
          "<br><span class='headingTxt'>" +
          graph.getNodeAttribute(nodeId, "name") +
          "</span><p>" +
          graph.getNodeAttribute(nodeId, "content") +
          "</p>";
      } else {
        var notebook = "";
        if (graph.getNodeAttribute(nodeId, "notebook").length > 0) {
          notebook =
            "</br><a href='" +
            graph.getNodeAttribute(nodeId, "notebook") +
            "' target='_blank'><b>Notebook</b></a></br>";
        }

        var team = "";
        graph
          .getNodeAttribute(nodeId, "team")
          .split(",")
          .forEach(function (member) {
            if (member in TEAM_DICT) {
              team = team + TEAM_DICT[member];
            } else {
              team = team + member;
            }
          });

        if (team.search("<img") > -1) {
          team = '<div class="member_list">' + team + "</div>";
        } else team = team + "</br>";

        node_info_ui.innerHTML =
          "<br><span class='headingTxt'>" +
          graph.getNodeAttribute(nodeId, "name") +
          "</span></br><i>" +
          graph.getNodeAttribute(nodeId, "methodology") +
          " " +
          graph.getNodeAttribute(nodeId, "nodeType").toLowerCase() +
          " project</i></br></br><b>Active:</b> " +
          graph.getNodeAttribute(nodeId, "years") +
          "</i></br><b>MsEE Lab Team: </b>" +
          team +
          "<b>Collaborators: </b>" +
          graph.getNodeAttribute(nodeId, "collaborators") +
          "</br><b>Products: </b>" +
          graph.getNodeAttribute(nodeId, "products") +
          "</br><b>Funding sources: </b>" +
          graph.getNodeAttribute(nodeId, "funding") +
          "</b>" +
          notebook +
          "<p>" +
          graph.getNodeAttribute(nodeId, "content") +
          "</p>";
      }

      // Since the data has been modified, we need to
      // call the refresh method to make the colors
      // update effective.
      // renderer.refresh();
    }

    renderer.on("clickNode", (e) => {
      selectNode(e.node);
    });

    // When the stage is clicked, we just color each
    // node and edge with its original color.
    renderer.on("clickStage", (e) => {
      colorUnselectedGraph();
      if (search_ui.value == "") search_ui.value = INIT_SEARCH_TERM;
    });

    colorUnselectedGraph();
    buildTermList();

    // don't know what this does but i'll leave it just in case :)
    return () => {
      renderer.kill();
    };
  },
});

function toggleShow(btn, txt) {
  if (btn == tools_btn) tools_show = !tools_show;
  else if (btn == questions_btn) questions_show = !questions_show;
  else if (btn == planned_btn) planned_show = !planned_show;
  else if (btn == active_btn) active_show = !active_show;
  else if (btn == archived_btn) archived_show = !archived_show;
  else if (btn == wet_btn) wet_show = !wet_show;
  else if (btn == dry_btn) dry_show = !dry_show;
  else if (btn == combined_btn) combined_show = !combined_show;

  if (btn.innerHTML.substring(0, 3) == "<u>") {
    btn.innerHTML = "<font color='#AAA'>" + txt + "</font>";
  } else btn.innerHTML = "<u>" + txt + "</u>";

  colorUnselectedGraph();
}

function colorUnselectedGraph() {
  renderer.graph.nodes().forEach(function (n) {
    if (
      (graph.getNodeAttribute(n, "nodeType") == "Lab" ||
        graph.getNodeAttribute(n, "nodeType") == "Branch" ||
        (((graph.getNodeAttribute(n, "nodeType") == "Tool" && tools_show) ||
          (graph.getNodeAttribute(n, "nodeType") == "Question" &&
            questions_show)) &&
          ((graph.getNodeAttribute(n, "status") == "Planned" && planned_show) ||
            (graph.getNodeAttribute(n, "status") == "Active" && active_show) ||
            (graph.getNodeAttribute(n, "status") == "Archived" &&
              archived_show)) &&
          ((graph.getNodeAttribute(n, "methodology") == "Experimental" &&
            wet_show) ||
            (graph.getNodeAttribute(n, "methodology") == "Computational" &&
              dry_show) ||
            (graph.getNodeAttribute(n, "methodology") ==
              "Experimental & computational" &&
              combined_show)))) &&
      searchFilter(n)
    ) {
      graph.setNodeAttribute(n, "displayed", true);
      showNode(n);
    } else {
      graph.setNodeAttribute(n, "displayed", false);
      grayNode(n);
    }
    if (!labels_show) graph.setNodeAttribute(n, "label", "");
    graph.setNodeAttribute(n, "show_label", false);
  });

  colorEdges();

  // renderer.refresh();
  node_info_ui.innerHTML = DEFAULT_TXT; // reset display list
}

function foundInAttribute(term, attribute, node) {
  return (
    graph
      .getNodeAttribute(node, attribute)
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .search(term) > -1
  );
}

function searchFilter(n) {
  var searchTerm = search_ui.value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  if (searchTerm.length > 0 && searchTerm != INIT_SEARCH_TERM.toLowerCase()) {
    return (
      foundInAttribute(searchTerm, "name", n) ||
      foundInAttribute(searchTerm, "years", n) ||
      foundInAttribute(searchTerm, "team", n) ||
      foundInAttribute(searchTerm, "collaborators", n) ||
      foundInAttribute(searchTerm, "funding", n) ||
      foundInAttribute(searchTerm, "products", n) ||
      foundInAttribute(searchTerm, "content", n)
    );
  } else return true;
}

function showNode(n) {
  graph.setNodeAttribute(
    n,
    "color",
    graph.getNodeAttribute(n, "originalColor"),
  );
  if (
    !MOBILE &&
    (n == "MsEE" || n == "SynBio" || n == "CompMod" || n == "Applications")
  ) {
    graph.setNodeAttribute(
      n,
      "image",
      graph.getNodeAttribute(n, "originalImage"),
    ); // set it to its original color
  }
  if (labels_show)
    graph.setNodeAttribute(n, "label", graph.getNodeAttribute(n, "name"));
}

function grayNode(n) {
  graph.setNodeAttribute(n, "color", "#eee"); // grey it out
  if (
    !MOBILE &&
    (n == "MsEE" || n == "SynBio" || n == "CompMod" || n == "Applications")
  ) {
    graph.setNodeAttribute(n, "image", graph.getNodeAttribute(n, "grayImage")); // set it to its original color
  }
  graph.setNodeAttribute(n, "label", "");
  graph.setNodeAttribute(n, "show_label", false);
}

function colorEdges() {
  renderer.graph.edges().forEach(function (e) {
    // for every edge,
    if (
      graph.getSourceAttribute(e, "displayed") &&
      graph.getTargetAttribute(e, "displayed")
    ) {
      graph.setEdgeAttribute(
        e,
        "color",
        graph.getEdgeAttribute(e, "originalColor"),
      ); // reset color
    } else graph.setEdgeAttribute(e, "color", "#eee"); // otherwise make it light gray
  });
}

function toggleLabels() {
  labels_show = !labels_show;

  if (labels_show) {
    labels_btn.innerHTML = "<u>labels</u>";
    renderer.graph.nodes().forEach(function (n) {
      if (graph.getNodeAttribute(n, "displayed")) {
        graph.setNodeAttribute(n, "label", graph.getNodeAttribute(n, "name"));
      }
    });
  } else {
    labels_btn.innerHTML = "<font color='#AAA'>labels</font>";
    renderer.graph.nodes().forEach(function (n) {
      if (
        !MOBILE ||
        (MOBILE &&
          (n.node != "MsEE" ||
            n.node != "SynBio" ||
            n.node != "CompMod" ||
            n.node != "Applications"))
      )
        graph.setNodeAttribute(n, "label", "");
    });
  }

  // renderer.refresh();
}

function buildTermList() {
  var dat = "";
  graph.nodes().forEach(function (n) {
    dat =
      dat +
      [
        graph.getNodeAttribute(n, "name"),
        graph.getNodeAttribute(n, "years"),
        graph.getNodeAttribute(n, "team"),
        graph.getNodeAttribute(n, "collaborators"),
        graph.getNodeAttribute(n, "funding"),
        graph.getNodeAttribute(n, "products"),
        graph.getNodeAttribute(n, "content"),
        "",
      ].join(" ");
  });
  var words = dat
    .toLowerCase()
    .replace(/[^\p{L}\s]/gu, " ")
    .normalize("NFD") // replaces accents
    .replace(/[\u0300-\u036f]/g, "") // replaces accents
    .split(" ");
  var terms = [];
  words.forEach(function (word) {
    word = word.trim();
    if (
      !OMITTED_WORDS.includes(word) &&
      word.length > 2 &&
      !terms.includes(word)
    ) {
      terms.push(word);
      var option = document.createElement("option");
      option.value = word;
      search_terms_ui.appendChild(option);
    }
  });
}

// Next, add listeners for the buttons on the UI:
tools_btn.addEventListener("click", () => toggleShow(tools_btn, "tools"));
questions_btn.addEventListener("click", () =>
  toggleShow(questions_btn, "questions"),
);
planned_btn.addEventListener("click", () => toggleShow(planned_btn, "planned"));
active_btn.addEventListener("click", () => toggleShow(active_btn, "active"));
archived_btn.addEventListener("click", () =>
  toggleShow(archived_btn, "archived"),
);
wet_btn.addEventListener("click", () => toggleShow(wet_btn, "wet lab"));
dry_btn.addEventListener("click", () => toggleShow(dry_btn, "dry lab"));
combined_btn.addEventListener("click", () =>
  toggleShow(combined_btn, "combined"),
);

labels_btn.addEventListener("click", () => toggleLabels());
search_ui.addEventListener("click", () => {
  if (search_ui.value == INIT_SEARCH_TERM) search_ui.value = "";
});
search_ui.addEventListener("input", () => {
  colorUnselectedGraph();
});
