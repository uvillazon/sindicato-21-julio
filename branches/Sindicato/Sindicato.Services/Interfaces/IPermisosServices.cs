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
    public interface IPermisosServices
    {
        //IEnumerable<SD_AUTOS> ObtenerAutos(Expression<Func<SD_USUARIOS, bool>> criterio);
        IEnumerable<SD_PERMISOS> ObtenerPermisosPaginados(PagingInfo paginacion, FiltrosModel<SociosModel> filtros);
        SD_PERMISOS ObtenerePermisoPorCriterio(Expression<Func<SD_PERMISOS, bool>> criterio);
        RespuestaSP GuardarPermiso(SD_PERMISOS permiso, string login);
        RespuestaSP AnularPermiso(SD_PERMISOS permiso, string login);
     }
}
