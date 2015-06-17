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
    public interface ICierresServices
    {

        IEnumerable<SD_CIERRES> ObtenerCierresPaginados(PagingInfo paginacion, FiltrosModel<SociosModel> filtros);
        
        RespuestaSP GuardarCierre(SD_CIERRES cierre, string login);

        SD_CIERRES ObtenerUltimoRegistroCierre();
        
    }
}
