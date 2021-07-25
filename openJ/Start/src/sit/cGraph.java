package sit;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.PriorityQueue;
import java.util.Set;
import java.util.Map.*;

import com.vividsolutions.jts.geom.Coordinate;
import com.vividsolutions.jts.geom.GeometryFactory;
import com.vividsolutions.jts.planargraph.PlanarGraph;
import com.vividsolutions.jump.feature.AttributeType;
import com.vividsolutions.jump.feature.BasicFeature;
import com.vividsolutions.jump.feature.Feature;
import com.vividsolutions.jump.feature.FeatureCollection;
import com.vividsolutions.jump.feature.FeatureDataset;
import com.vividsolutions.jump.feature.FeatureSchema;

import com.vividsolutions.jump.workbench.model.Layer;
import com.vividsolutions.jump.workbench.plugin.AbstractPlugIn;
import com.vividsolutions.jump.workbench.plugin.PlugInContext;
import com.vividsolutions.jump.workbench.ui.plugin.FeatureInstaller;

import Utility.Select;
import sit.Graph;

public class cGraph extends AbstractPlugIn{
	// Graph graph = new Graph();
	// HashMap<Coordinate,Integer> hm=new HashMap<>();
	// HashMap<Coordinate,Node> map_nodi=new HashMap<>();
    @Override
	public void initialize(PlugInContext arg0) throws Exception {
		FeatureInstaller featureInstaller = new FeatureInstaller(arg0.getWorkbenchContext());
		featureInstaller.addMainMenuPlugin(
			this, //the plugin to execute on click
			new String[] {"Esame" }, //menu path
			"cGraph", //name
			false, //checkbox
			null, //icon
			null );
	}
	// @Override
	// public boolean execute(PlugInContext arg0) throws Exception {
	// 	//newLayer(arg0);
	// 	Node nodeA = new Node(0);
	// 	Node nodeB = new Node(1);
	// 	Node nodeC = new Node(2);
	// 	Node nodeD = new Node(3); 
	// 	Node nodeE = new Node(4);
	// 	Node nodeF = new Node(5);

	// 	nodeA.addDestination(nodeB, 10);
	// 	nodeA.addDestination(nodeC, 15);

	// 	nodeB.addDestination(nodeD, 12);
	// 	nodeB.addDestination(nodeF, 15);

	// 	nodeC.addDestination(nodeE, 10);

	// 	nodeD.addDestination(nodeE, 2);
	// 	nodeD.addDestination(nodeF, 1);

	// 	nodeF.addDestination(nodeE, 5);

	// 	Graph graph = new Graph();

	// 	graph.addNode(nodeA);
	// 	graph.addNode(nodeB);
	// 	graph.addNode(nodeC);
	// 	graph.addNode(nodeD);
	// 	graph.addNode(nodeE);
	// 	graph.addNode(nodeF);


	// 	graph = Dijkstra.calculateShortestPathFromSource(graph, nodeA);
    //     for (Node n : graph.getNodes()) {
			
	// 		if(n.getName()==4){
	// 			System.out.println(n.getName()+" dist: "+n.getDistance());
	// 			for (Node sp : n.getShortestPath()) {
	// 				System.out.println("sp:"+ sp.getName());
	// 			}
	// 		}

	// 	}
	// 	//LineString(arg0);
	// 	return false;
	// }
	@Override
	public boolean execute(PlugInContext arg0) throws Exception {
		//newLayer(arg0);
		
		Layer strade=arg0.getLayerManager().getLayer("Strade3857");
		creaPunti(arg0, strade);

		return false;
	}

	public void creaPunti(PlugInContext context, Layer layer) {
		HashMap<Coordinate,Integer> hm=new HashMap<>();
		HashMap<Coordinate,Node> map_nodi=new HashMap<>();
		Graph graph = new Graph();
		//HashMap<Coordinate,List<Coordinate>> map_distanze=new HashMap<>();
		int id=0;
		FeatureSchema fs= new FeatureSchema();
		fs.addAttribute("geometry", AttributeType.GEOMETRY);
		fs.addAttribute("id", AttributeType.INTEGER);
		fs.addAttribute("grado", AttributeType.INTEGER);
		GeometryFactory gf=new GeometryFactory();
		FeatureCollection fc=new FeatureDataset(fs);

		for (Feature f : layer.getFeatureCollectionWrapper().getFeatures()) {
			Coordinate[] coordinate=f.getGeometry().getCoordinates();
			Coordinate sV=new Coordinate(coordinate[0].x,coordinate[0].y);
			Coordinate eV=new Coordinate(coordinate[coordinate.length-1].x,coordinate[coordinate.length-1].y);
			List<Integer> lista_collegamenti=new ArrayList<>();
			List<Node> lista_nodi=new ArrayList<>();
			//controllo null
			if(hm.containsKey(sV)){
				System.out.println("if: "+hm.containsKey(sV));
				int incre=hm.get(sV);
				incre++;
				hm.replace(sV, incre);
				Node nodeB=map_nodi.get(sV);
				System.out.println("if");
				id++;
				Node nodeD=new Node(id);
				// graph.removeNode(nodeB);
				nodeB.addDestination(nodeD, id);
				nodeD.addDestination(nodeB, id);
				map_nodi.put(eV, nodeD);
				
				graph.addNode(nodeB);
				graph.addNode(nodeD);

				

			}else{
				System.out.println("else: "+ hm.containsKey(sV));
				hm.put(sV, 1);
				Feature ff=new BasicFeature(fs);
				id++;
				ff.setAttribute(0, gf.createPoint(sV));
				ff.setAttribute(1, id);
				ff.setAttribute(2, 1);
				fc.add(ff);
				Node nodeB=new Node(id);
				id++;
				Node nodeD=new Node(id);
				nodeB.addDestination(nodeD, id);
				nodeD.addDestination(nodeB, id);
				graph.addNode(nodeB);
				graph.addNode(nodeD);
				map_nodi.put(sV, nodeB);
				map_nodi.put(eV, nodeD);
			}
			if(hm.containsKey(eV)){
				System.out.println("if: "+hm.containsKey(eV));
				int incre=hm.get(eV);
				incre++;
				hm.replace(eV, incre);
				Node nodeB=map_nodi.get(eV);
				System.out.println("if");
				id++;
				Node nodeD=new Node(id);
				// graph.removeNode(nodeB);
				nodeB.addDestination(nodeD, id);
				nodeD.addDestination(nodeB, id);
				map_nodi.put(sV, nodeD);
				
				graph.addNode(nodeB);
				graph.addNode(nodeD);

				

			}else{
				System.out.println("else: "+ hm.containsKey(eV));
				hm.put(eV, 1);
				Feature ff=new BasicFeature(fs);
				id++;
				ff.setAttribute(0, gf.createPoint(eV));
				ff.setAttribute(1, id);
				ff.setAttribute(2, 1);
				fc.add(ff);
				Node nodeB=new Node(id);
				id++;
				Node nodeD=new Node(id);
				nodeB.addDestination(nodeD, id);
				nodeD.addDestination(nodeB, id);
				graph.addNode(nodeB);
				graph.addNode(nodeD);
				map_nodi.put(eV, nodeB);
				map_nodi.put(sV, nodeD);
			}

			// if (hm.get(eV) != null) {
			// 	int incre=hm.get(eV);
			// 	incre++;
			// 	hm.replace(eV, incre);
			// 	id++;

			// 	lista_nodi=map_nodi.get(sV);
			// 	lista_nodi.add(new Node(id));
			// 	map_nodi.remove(sV);
			// }else{
			// 	hm.put(eV, 1);
			// 	Feature ff=new BasicFeature(fs);
			// 	id++;

			// 	ff.setAttribute(0, gf.createPoint(eV));
			// 	ff.setAttribute(1, id);
			// 	ff.setAttribute(2, 1);
			// 	fc.add(ff);
			// 	// lista_collegamenti.add(id);
			// 	lista_nodi.add(new Node(id));
			// }
			// map_nodi.put(eV, lista_nodi);



		//mez funz
		//1352
        // for (Feature f : layer.getFeatureCollectionWrapper().getFeatures()) {
		// 	Coordinate[] coordinate=f.getGeometry().getCoordinates();
		// 	Coordinate sV=new Coordinate(coordinate[0].x,coordinate[0].y);
		// 	Coordinate eV=new Coordinate(coordinate[coordinate.length-1].x,coordinate[coordinate.length-1].y);
		// 	List<Integer> lista_collegamenti=new ArrayList<>();
		// 	List<Node> lista_nodi=new ArrayList<>();
		// 	//controllo null
		// 	if(hm.get(sV) != null){
		// 		id++;
		// 		int incre=hm.get(sV);
		// 		incre++;
		// 		id_ver++;
		// 		hm.replace(sV, incre);
		// 		// lista_collegamenti=map_collegamenti.get(sV);
		// 		lista_nodi=map_nodi.get(sV);
		// 		lista_nodi.add(new Node(id_ver));
		// 		map_nodi.remove(sV);
		// 		// lista_collegamenti.add(id_ver);
		// 	}else{
		// 		hm.put(sV, 1);
		// 		Feature ff=new BasicFeature(fs);
		// 		id++;
		// 		id_ver++;
		// 		ff.setAttribute(0, gf.createPoint(sV));
		// 		ff.setAttribute(1, id);
		// 		ff.setAttribute(2, 1);
		// 		fc.add(ff);
		// 		lista_nodi.add(new Node(id_ver));
		// 		// lista_collegamenti.add(id);

		// 	}
		// 	map_nodi.put(sV, lista_nodi);

		// 	lista_nodi=new ArrayList<>();
		// 	if (hm.get(eV) != null) {
		// 		int incre=hm.get(eV);
		// 		incre++;
		// 		hm.replace(eV, incre);
		// 		id++;
		// 		id_ver++;
		// 		lista_nodi=map_nodi.get(sV);
		// 		lista_nodi.add(new Node(id_ver));
		// 		map_nodi.remove(sV);
		// 	}else{
		// 		hm.put(eV, 1);
		// 		Feature ff=new BasicFeature(fs);
		// 		id++;
		// 		id_ver++;
		// 		ff.setAttribute(0, gf.createPoint(eV));
		// 		ff.setAttribute(1, id);
		// 		ff.setAttribute(2, 1);
		// 		fc.add(ff);
		// 		// lista_collegamenti.add(id);
		// 		lista_nodi.add(new Node(id_ver));
		// 	}
		// 	map_nodi.put(eV, lista_nodi);


			//BOH
			// map_collegamenti.put(sV, lista_collegamenti);
			// lista_collegamenti=new ArrayList<>();
			// if (hm.get(eV) != null) {
			// 	int incre=hm.get(eV);
			// 	incre++;
			// 	hm.replace(eV, incre);
			// 	id++;
			// 	lista_collegamenti=map_collegamenti.get(eV);
			// 	map_collegamenti.remove(eV);
			// 	lista_collegamenti.add(id);
			// }else{
			// 	hm.put(eV, 1);
			// 	Feature ff=new BasicFeature(fs);
			// 	id++;
			// 	ff.setAttribute(0, gf.createPoint(eV));
			// 	ff.setAttribute(1, id);
			// 	ff.setAttribute(2, 1);
			// 	fc.add(ff);
			// 	lista_collegamenti.add(id);
			// }
			// map_collegamenti.put(eV, lista_collegamenti);
        }

		// for (Entry<Coordinate, Node> pair : map_nodi.entrySet()) {
		// 	Node node=pair.getValue();
		// 	Coordinate key=pair.getKey();

		// 	System.out.println("map: "+"key: "+key+" value: "+node.getName());
		// }
		for (Node n : graph.getNodes()) {
			System.out.println("graph: "+"node: "+n.getName()+" adj:"+n.getAdjacentNodes());
		}
		context.addLayer("Result", "puntiCreati", fc);
	}


	public void ve(){
		Node nodeA = new Node(0);
		Node nodeB = new Node(1);
		Node nodeC = new Node(2);
		Node nodeD = new Node(3); 
		Node nodeE = new Node(4);
		Node nodeF = new Node(5);

		nodeA.addDestination(nodeB, 10.0);
		nodeA.addDestination(nodeC, 15);

		nodeB.addDestination(nodeD, 12);
		nodeB.addDestination(nodeF, 15);

		nodeC.addDestination(nodeE, 10);

		nodeD.addDestination(nodeE, 2);
		nodeD.addDestination(nodeF, 1);

		nodeF.addDestination(nodeE, 5);

		

		graph.addNode(nodeA);
		graph.addNode(nodeB);
		graph.addNode(nodeC);
		graph.addNode(nodeD);
		graph.addNode(nodeE);
		graph.addNode(nodeF);


		graph = Dijkstra.calculateShortestPathFromSource(graph, nodeA);
        for (Node n : graph.getNodes()) {
			
			if(n.getName()==4){
				System.out.println(n.getName()+" dist: "+n.getDistance());
				for (Node sp : n.getShortestPath()) {
					System.out.println("sp:"+ sp.getName());
				}
			}

		}
		//LineString(arg0);

	}

}


