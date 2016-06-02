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
    public interface ICierresAhorroServices
    {

        
        List<CierreAhorroSocioModel> ObtenerCierreAhorroSocio(DateTime fecha);
        
    }
}
