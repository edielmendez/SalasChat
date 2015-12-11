/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.UUID;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;



/**
 *
 * @author Bodega
 */
@WebServlet(urlPatterns = {"/SalaChat"})
public class SalaChat extends HttpServlet {
    private HashMap<String,HttpServletResponse> clientes = new HashMap<>();
    private LinkedList<String> salas = new LinkedList<String>();
    
    
    //private JSONObject salas = new JSONObject();
    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Servlet SalaChat</title>");            
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet SalaChat at " + request.getContextPath() + "</h1>");
            out.println("</body>");
            out.println("</html>");
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        //processRequest(request, response);
        response.setContentType("text/event-stream;charset=UTF-8");
       
        clientes.put(UUID.randomUUID().toString(), response);
        while(true){
            try{
                Thread.sleep(5000);
            }catch(Exception e){
                
            }
        }
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        //processRequest(request, response);
        String text = request.getParameter("text");
        String user = request.getParameter("user");
        String sala = request.getParameter("sala");
        String evtNewSal  = request.getParameter("salaNew");
        String getSalas = request.getParameter("eliminar");
        
        if(getSalas!=null){
            response.setContentType("text/plain;charset=utf-8");
            //System.out.println("Ediel");
            
            //if(salas.size()>0){
                /*String json = "{0:"+salas.get(0)+"";
                for(int i=0;i<salas.size();i++){
                    json+=","+(i)+":"+salas.get(i);
                }
                json+="}";*/
            
                for(HttpServletResponse c:clientes.values()){
                    c.getWriter().write("event:getAllSalas\n");
                    c.getWriter().write("data:\""+getSalas+"\"\n\n");
                    c.getWriter().flush();
                }
            //}
        }else{
        if(evtNewSal!=null){/*
            if(!salas.containsKey(evtNewSal)){
                salas.put(evtNewSal, evtNewSal);
            }*/
            salas.add(evtNewSal);
            response.setContentType("text/plain;charset=utf-8");
            for(HttpServletResponse c:clientes.values()){
                c.getWriter().write("event:salaNew\n");
                c.getWriter().write("data:\""+evtNewSal+"\"\n\n");
                c.getWriter().flush();
            }
        }else{
            response.setContentType("text/plain;charset=utf-8");
            for(HttpServletResponse c:clientes.values()){

                c.getWriter().write("data:{\"type\":\"message\" ,"
                        + "\"content\":\""+text+"\",\"user\":\""+user+"\",\"sala\":\""+sala+"\"}\n\n");
                c.getWriter().flush();

                /*c.getWriter().write("event:"+sala+"\n");
                c.getWriter().write("data:{\"content\":\""+text+"\",\"user\":\""+user+"\"}\n\n");
                c.getWriter().flush();*/

                /*
                c.getWriter().write("event: ping\n");
                c.getWriter().write("data: \"evento ping\"\n\n");
                c.getWriter().flush();*/

            }
        }
        }
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
