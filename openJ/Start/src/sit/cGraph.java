package sit;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.PriorityQueue;
import java.util.Set;

import com.vividsolutions.jts.planargraph.PlanarGraph;
import com.vividsolutions.jump.feature.Feature;
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
	@Override
	public boolean execute(PlugInContext arg0) throws Exception {
		//newLayer(arg0);
		Node nodeA = new Node("A");
		Node nodeB = new Node("B");
		Node nodeC = new Node("C");
		Node nodeD = new Node("D"); 
		Node nodeE = new Node("E");
		Node nodeF = new Node("F");

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
			if(n.getName()=="E"){
				System.out.println(n.getName()+" dist: "+n.getDistance());
				for (Node sp : n.getShortestPath()) {
					System.out.println("sp:"+ sp.getName());
				}
			}

		}
		//LineString(arg0);
		return false;
	}

}


