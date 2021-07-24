package sit;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.PriorityQueue;
import java.util.Set;

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
		Node nodeA = new Node(0);
		Node nodeB = new Node(1);
		Node nodeC = new Node(2);
		Node nodeD = new Node(3); 
		Node nodeE = new Node(4);
		Node nodeF = new Node(5);

		nodeA.addDestination(nodeB, 10);
		nodeA.addDestination(nodeC, 15);

		nodeB.addDestination(nodeD, 12);
		nodeB.addDestination(nodeF, 15);

		nodeC.addDestination(nodeE, 10);

		nodeD.addDestination(nodeE, 2);
		nodeD.addDestination(nodeF, 1);

		nodeF.addDestination(nodeE, 5);

		Graph graph = new Graph();

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
		return false;
	}
	public void addPointStrade(PlugInContext context, Layer layer) {
		HashMap<Integer,Integer> hm=new HashMap<>();
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
			//controllo null
			
			if(hm.get(sV) != null){
				int incre=hm.get(sV);
				incre++;
				hm.replace(id, incre);
			}else{
				id++;
				hm.put(id, 1);
				Feature ff=new BasicFeature(fs);
				ff.setAttribute(0, gf.createPoint(sV));
				ff.setAttribute(1, id);
				ff.setAttribute(2, hm.get(id));
				fc.add(ff);
				Node nodeB = new Node(id);
				Node nodeD = new Node(hm.get(id));
				nodeB.addDestination(nodeD, (int)f.getGeometry().getLength());

			}
			if (hm.get(eV) != null) {
				int incre=hm.get(eV);
				incre++;
				hm.replace(eV, incre);
			}else{
				hm.put(eV, 1);
			}
        }
		// FeatureSchema fs= new FeatureSchema();
        // fs.addAttribute("geometry", AttributeType.GEOMETRY);
		// fs.addAttribute("id", AttributeType.INTEGER);
		// GeometryFactory gf=new GeometryFactory();
		// FeatureCollection fc=new FeatureDataset(fs);


		// for (Coordinate c : hm.keySet()) {
		// 	Feature f=new BasicFeature(fs);
		// 	id++;
		// 	f.setAttribute(0, gf.createPoint(c));
		// 	f.setAttribute(1, id);
		// 	f.setAttribute(2, hm.get(c));
		// 	fc.add(f);
		// }
		context.addLayer("Result", "punti",fc);
	}

}


