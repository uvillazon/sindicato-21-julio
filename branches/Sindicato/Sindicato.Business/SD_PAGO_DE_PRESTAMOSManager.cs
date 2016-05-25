
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Sindicato.Common;
using Sindicato.Common.Data;
using Sindicato.Model;
using Sindicato.Common.Data.Interfaces;
using System.Data.Objects;

namespace Sindicato.Business
{
    public class SD_PAGO_DE_PRESTAMOSManager : Repository<SD_PAGO_DE_PRESTAMOS>
    {


        public SD_PAGO_DE_PRESTAMOSManager(IUnitOfWork uow) : base(uow) { }

        //test
        
    }
}
