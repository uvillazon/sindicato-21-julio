using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Sindicato.Services.Interfaces;
using Sindicato.Common;
using Sindicato.Model;
using System.Linq.Dynamic;
using LinqKit;
using Sindicato.Business;
using System.Linq.Expressions;
using System.Data.Objects;
using Sindicato.Services.Model;

namespace Sindicato.Services
{
    public class ReportesServices : BaseService
    {
        
        public IEnumerable<ReporteTotal> ObtenerReporteTotal(DateTime FECHA_INI , DateTime FECHA_FIN)
        {
            IQueryable<ReporteTotal> result = null;
            ExecuteManager(uow =>
            {
               

            });
            return result;
        }

  
    }
}
