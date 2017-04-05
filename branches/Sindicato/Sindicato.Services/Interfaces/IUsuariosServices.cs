using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Sindicato.Common;
using Sindicato.Model;
using Sindicato.Services.Model;
using System.Linq.Expressions;

namespace Sindicato.Services.Interfaces
{
    public interface IUsuariosServices
    {
        IEnumerable<SD_USUARIOS> ObtenerUsuariosPorCriterio(Expression<Func<SD_USUARIOS, bool>> criterio);
        IEnumerable<SD_USUARIOS> ObtenerUsuariosPaginados(PagingInfo paginacion);
        IEnumerable<SD_PERFILES> ObtenerPerfilesPaginados(PagingInfo paginacion);
        IEnumerable<SD_MENU_OPCIONES> ObtenerMenuOpcionesPaginados(PagingInfo paginacion);
        IEnumerable<SD_MENU_OPCIONES> ObtenerMenuOpcionesPorCriterio(Expression<Func<SD_MENU_OPCIONES, bool>> criterio);

        RespuestaSP SP_GrabarUsuario(SD_USUARIOS usr, int ID_USR);
        RespuestaSP SP_GrabarPerfil(SD_PERFILES per, int ID_USR);
        //IEnumerable<SG_MENU_OPCIONES> Obtene(Expression<Func<SG_USUARIOS, bool>> criterio);
        //SG_USUARIOS
    }
}
