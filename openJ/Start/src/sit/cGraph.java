package sit;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
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
		HashMap<Coordinate,List<Coordinate>> map_collegamenti=new HashMap<>();
		HashMap<Coordinate,List<Coordinate>> map_distanze=new HashMap<>();
		int id=0;
		FeatureSchema fs= new FeatureSchema();
		fs.addAttribute("geometry", AttributeType.GEOMETRY);
		fs.addAttribute("id", AttributeType.INTEGER);
		fs.addAttribute("grado", AttributeType.INTEGER);
		GeometryFactory gf=new GeometryFactory();
		FeatureCollection fc=new FeatureDataset(fs);
		//1352
        for (Feature f : layer.getFeatureCollectionWrapper().getFeatures()) {
			Coordinate[] coordinate=f.getGeometry().getCoordinates();
			Coordinate sV=new Coordinate(coordinate[0].x,coordinate[0].y);
			Coordinate eV=new Coordinate(coordinate[coordinate.length-1].x,coordinate[coordinate.length-1].y);
			List<Coordinate> lista_collegamenti_sV=new ArrayList<>();
			List<Coordinate> lista_collegamenti_eV=new ArrayList<>();
			//controllo null
			if(hm.get(sV) != null){
				int incre=hm.get(sV);
				incre++;
				hm.replace(sV, incre);
				lista_collegamenti_sV.add(eV);
			}else{
				hm.put(sV, 1);
				Feature ff=new BasicFeature(fs);
				id++;
				ff.setAttribute(0, gf.createPoint(sV));
				ff.setAttribute(1, id);
				ff.setAttribute(2, 1);
				fc.add(ff);
				lista_collegamenti_sV.add(eV);
			}
			map_collegamenti.put(sV, lista_collegamenti_sV);

			if (hm.get(eV) != null) {
				int incre=hm.get(eV);
				incre++;
				hm.replace(eV, incre);
				lista_collegamenti_eV.add(sV);
			}else{
				hm.put(eV, 1);
				Feature ff=new BasicFeature(fs);
				id++;
				ff.setAttribute(0, gf.createPoint(eV));
				ff.setAttribute(1, id);
				ff.setAttribute(2, 1);
				fc.add(ff);
				lista_collegamenti_eV.add(sV);
			}
			map_collegamenti.put(sV, lista_collegamenti_sV);
        }

		for (Entry<Coordinate, List<Coordinate>> pair : map_collegamenti.entrySet()) {
			List<Coordinate> value=new ArrayList<>();
			Coordinate key=pair.getKey();
			value=pair.getValue();
			System.out.println("key: "+key+" value: "+value);
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

	}

}


